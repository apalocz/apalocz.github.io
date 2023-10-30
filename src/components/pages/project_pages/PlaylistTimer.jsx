
import { useState, useRef, useEffect } from "react";

const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;
const MILLISECONDS_PER_SECOND = 1000;

const SUCCESS_STATUS = 200;
const AUTH_ERROR_STATUS = 401;
const EXPIRED_TIMESTAMP_STATUS = 403;
const RATE_LIMIT_STATUS = 429;



/* **********************************************************************************
 * Spotify client authentification
 *  modified from  https://developer.spotify.com/documentation/web-api/howtos/web-app-profile
 *********************************************************************************/

const clientId = "6c855998c6eb44e2b1f4488486dc3c7d";

// redirect to Spotify to log in
export async function redirectToAuthCodeFlow(clientId, basePageUrl) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", basePageUrl);
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


//Get query results for a given URL (or return error number if we get an error) 
async function getQueryUrl(token, url) {
    const result = await fetch(url, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    if(result.status !== SUCCESS_STATUS) {
        return {error: result.status, headers: result.headers, result};
    }
    return await result.json();
}


//First query for track data from Spotify
async function getInitialTracks(token, genre) {
    const baseSearchUrl = "https://api.spotify.com/v1/search?";
    const queryParams = new URLSearchParams();
    queryParams.append("q", `genre=${genre}`);
    queryParams.append("type", "track");
    queryParams.append("limit", 50);
    
    const queryUrl = baseSearchUrl + queryParams.toString();
    return getQueryUrl(token, queryUrl);
}


/* **********************************************************************************
 * Array and sorting helper functions
 *********************************************************************************/


// Helper function to find the index where a value would go in a sorted list
function binarySearchIndex(trackList, duration) {
    let low = 0;
    let high = trackList.length;

    while (low < high) {
        const mid = (low + high) >>> 1; // unsigned right shift; equivalent to dividing by two, floored
        if (trackList[mid].duration_ms < duration) low = mid + 1;
        else high = mid;
    }
    return low;
}


// perform a sorted insert
function sortInsert (trackList, newTrack)
 {
    const insertionIndex = binarySearchIndex(trackList, newTrack.duation_ms);
    trackList.splice(insertionIndex, 0, newTrack);
}


// replace a track in the list
function replaceInsert (trackList, newTrack, deletionIndex)
 {
    trackList.splice(deletionIndex, 1);
    const insertionIndex = binarySearchIndex(trackList, newTrack.duation_ms);
    trackList.splice(insertionIndex, 0, newTrack);
}

// shuffling function; from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


/* **********************************************************************************
 * Miscillaneous other helper functions
 *********************************************************************************/

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }


/* Component function for the playlist timer page  */

function PlaylistTimer() {
    const [accessToken, setAccessToken] = useState("");
    const [profile, setProfile] = useState({});
    const [codeInvalid, setCodeInvalid] = useState(false);
    const [genreSeeds, setGenreSeeds] = useState({});
    const [selectedGenre, setSelectedGenre] = useState("");
    const [durationMinutes, setDurationMinutes] = useState(0);
    const [durationSeconds, setDurationSeconds] = useState(0);

    

    const [makingPlaylist, setMakingPlaylist] = useState(false);
    const [progress, setProgress] = useState(0);
    const [playlist, setPlaylist] = useState({});

    const requestedDuration = (durationMinutes * SECONDS_PER_MINUTE + durationSeconds) * MILLISECONDS_PER_SECOND;

    if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const basePageUrl = window.location.origin + window.location.pathname;

        // get access token for the current user
        async function getAccessToken() {
            const verifier = localStorage.getItem("verifier");
        
            const params = new URLSearchParams();
            params.append("client_id", clientId);
            params.append("grant_type", "authorization_code");
            params.append("code", code);
            params.append("redirect_uri", basePageUrl);
            params.append("code_verifier", verifier);
        
            const result = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: params
            });
        
            const resultJson = await result.json();
        
            if(resultJson.error) {
                setCodeInvalid(true);
            }
        
            const { access_token } = resultJson;
            setAccessToken(access_token);
            return access_token;
        }


        async function handleRequestError(error, retryFunc, retryParams) {
            // if it's an auth token issue, try to get another token and try again
            if(error === AUTH_ERROR_STATUS) {
                const newAccessToken = await getAccessToken();
                if(!newAccessToken) {
                    setCodeInvalid(true);
                    return;
                }
                return retryFunc(newAccessToken, ...retryParams)
            }
            // if our timestamp code is invalid, prompt the user to login again
            else if(error === EXPIRED_TIMESTAMP_STATUS) {
                setCodeInvalid(true);
                return;
            }
            else if(error === RATE_LIMIT_STATUS) {
                const retryAfterTime = parseInt(result.headers.retry-after) * MILLISECONDS_PER_SECOND;
                await setTimeout(ms=retryAfterTime);
                return retryFunc(accessToken, ...retryParams);
            }
        }

        // get the user's profile
        async function fetchProfile(token) {
            let newProfile = await getQueryUrl(token, "https://api.spotify.com/v1/me");
            if(newProfile.error) {
                newProfile = await handleRequestError(profile.error, fetchProfile, []);
            }
            if(newProfile) setProfile(newProfile);
            return newProfile;
        }

        // set list of recommendation seed genres
        async function getGenreSeeds(token) {
            let newGenreSeeds = await getQueryUrl(token, "https://api.spotify.com/v1/recommendations/available-genre-seeds");
            if(newGenreSeeds.error) {
                newGenreSeeds = await handleRequestError(profile.error, getGenreSeeds, []);
            }
            if(newGenreSeeds) {
                setGenreSeeds(newGenreSeeds);
                setSelectedGenre(newGenreSeeds.genres[0]);
            }
            return newGenreSeeds;
        }

        function enterMinutes(element) {
            let newMinutes = parseInt(element.value);
            if(newMinutes >= MINUTES_PER_HOUR) {
                newMinutes = MINUTES_PER_HOUR - 1
            }
            if(!newMinutes) {
                newMinutes = 0;
            }
            element.value = newMinutes;
            setDurationMinutes(newMinutes);
        }

        function enterSeconds(element) {
            let newSeconds = parseInt(element.value);
            if(newSeconds >= SECONDS_PER_MINUTE) {
                newSeconds = SECONDS_PER_MINUTE - 1
            }
            if(!newSeconds) {
                newSeconds = 0;
            }
            element.value = newSeconds;
            setDurationSeconds(newSeconds);
        }

        async function generatePlaylist() {
            setMakingPlaylist(true);
            const time = Date.now();
            const newPlaylist = await findPlaylist(selectedGenre, requestedDuration);
            const elapsedTime = Date.now() - time;
            if(newPlaylist) {
                setPlaylist(newPlaylist);
            }
            setMakingPlaylist(false);

        }


        // iterate through tracks, looking for a playlist that adds up to a certain number of milliseconds
        // give or take a duration margin
        async function findPlaylist(genre, playlistDuration, durationMargin=MILLISECONDS_PER_SECOND/4) {

            let currentToken = accessToken;
            const maxDuration = playlistDuration + durationMargin;
            const minDuration = playlistDuration - durationMargin;
            // const millisecondValues = new Set();
            const trackList = [];
            let combinedDuration = 0;


            // make array to keep track of every combination we've found below our length
            const songCombinationTracker = new Array(playlistDuration + durationMargin);

            // iterate through track pages until either until we've run out of next pages or we've reached the right time
            let nextPageUrl = "";
            let tracksSeen = 0;
            while(true) {

                // get next page of results
                let result;
                if(nextPageUrl === "") result = await getInitialTracks(currentToken, genre);
                else result = await getQueryUrl(currentToken, nextPageUrl);

                // if we get an error instead of results
                if(result.error) {
                    // if it's an auth token issue, try to get another token and try again
                    if(result.error === AUTH_ERROR_STATUS) {
                        const newAccessToken = await getAccessToken();
                        if(!newAccessToken) {
                            setCodeInvalid(true);
                            return null;
                        }
                        currentToken = newAccessToken;
                        continue;
                    }
                    // if our timestamp code is invalid, prompt the user to login again
                    else if(result.error === EXPIRED_TIMESTAMP_STATUS) {
                        setCodeInvalid(true);
                        return null;
                    }
                    else if(result.error === RATE_LIMIT_STATUS) {
                        const retryAfterTime = parseInt(result.headers.retry-after) * MILLISECONDS_PER_SECOND;
                        await setTimeout(ms=retryAfterTime);
                        continue;
                    }
                }


                const {items, next, total} = result.tracks;
                nextPageUrl = next;

                shuffle(items);

                for(const track of items) {
                    tracksSeen += 1;
                    setProgress(Math.round(tracksSeen/total * 100));
                    // check if our duration is currently close enough to return
                    if(combinedDuration > minDuration && combinedDuration < maxDuration) {
                        return {duration: combinedDuration, trackList};
                    }

                    // if track is longer than our playlistDuration, skip it
                    const {duration_ms} = track;
                    if(duration_ms > maxDuration) {
                        continue;
                    }

                    // if track is in range of our playlistDuration, return it
                    if(duration_ms > minDuration) {
                        return {
                            duration: duration_ms,
                            trackList: [track]
                        };
                    }

    
                    // if our new total duration would be less than the playlistDuration, add this song to our list
                    if(combinedDuration + duration_ms < playlistDuration) {
                        sortInsert(trackList, track);
                        combinedDuration += duration_ms;
                        continue;
                    }

                    //Otherwise, check against current difference and find the optimal track to replace
                    let currentDifference = playlistDuration - combinedDuration;
                    const optimalReplacedDuration = duration_ms - currentDifference;

                    // find the place in the sorted list where this optimal replaced track would be; 
                    // then look at the tracks before and after that to see if either is close enough to be woth
                    // replacing
                    const replaceIndex = binarySearchIndex(trackList, duration_ms); 
                    if(replaceIndex >= trackList.length) {
                        // this means there is nothing in the list. This should not happen.
                        continue; 
                    }

                    const afterCandidate = trackList[replaceIndex];
                    // what's the new difference if we replace the 'after' candidate?
                    const afterCandidateDifference = currentDifference + afterCandidate.duration_ms - duration_ms;

                    let beforeCandidateDifference = currentDifference;
                    let beforeCandidate;
                    if(replaceIndex - 1 > 0) {
                        // if we're not at the start of the list, consider replacing the "before" candidate instead
                        beforeCandidate = trackList[replaceIndex - 1];
                        beforeCandidateDifference = currentDifference + beforeCandidate.duration_ms - duration_ms;

                    }

                    const minDifference = Math.min(Math.abs(beforeCandidateDifference), 
                                                    Math.abs(afterCandidateDifference),
                                                    Math.abs(currentDifference));
                    if(minDifference ==  Math.abs(currentDifference)) continue;
                    else if(minDifference == Math.abs(afterCandidateDifference)) {
                        combinedDuration = combinedDuration - afterCandidate.duration_ms + duration_ms;
                        replaceInsert(trackList, track, replaceIndex);
                        continue;
                    }
                    else if (beforeCandidate){
                        combinedDuration = combinedDuration - beforeCandidate.duration_ms + duration_ms;
                        replaceInsert(trackList, track, replaceIndex - 1);
                    }

                }

                // if there is no next page of results, break
                if(!nextPageUrl) {
                    break;
                }
            }

            // if we've reached here, that means we've exhausted our search without finding a suitable playlist;
            // in this case, we just return what we have.
            return {duration: combinedDuration, trackList};
        }



        // get access token if we have the code for it
        useEffect(() => {
            if(accessToken === "" && code) getAccessToken();
        }, []);


        useEffect(() => {
            if(accessToken !== "") {
                fetchProfile(accessToken);
                getGenreSeeds(accessToken);

            }
        }, [accessToken]);

        if(!code || codeInvalid) {
            return (
                <>
                <button onClick={() => redirectToAuthCodeFlow(clientId, basePageUrl)}>Login to Spotify</button>
                </>
            )
        }


        if(profile == {} || genreSeeds == {}) {
            return(<>Waiting on authentification....</>)
        }

 
        return(
            <>
            <p> Logged in as {profile.display_name}. Email: {profile.email}</p>


            {genreSeeds && genreSeeds.genres &&
            (<>
                <h3>Genre:</h3>
                <br/>
                <select name="genres" id="genre_select" onChange={(e)=> setSelectedGenre(e.target.value)}>
                        {genreSeeds.genres.map(genre => (<option key={genre} value={genre}>{genre}</option>))}
                </select>
                <br/> <br/>

                <h3>Time</h3>
                <input type="number" min="0" max={`${MINUTES_PER_HOUR/2}`} onChange={(e)=> enterMinutes(e.target)}/> : 
                <input type="number" min="0" max={`${SECONDS_PER_MINUTE}`} onChange={(e)=> enterSeconds(e.target)}/>
                <br/> <br/>

            </>
            )}

            {
                
                makingPlaylist ? (<>Making Playlist.... {progress}%</>) :
                selectedGenre && ((requestedDuration !== 0) && (
                    <button id="create_playlist_button" onClick={generatePlaylist}>Create Playlist</button>))
            }

            {(playlist.trackList) &&

            (<>
            <br/> <br/>
            <h3>Playlist</h3>
            <p>Time: {millisToMinutesAndSeconds(playlist.duration)}</p>
            <p>Tracks: <ul>{playlist.trackList.map(track => <li> {millisToMinutesAndSeconds(track.duration_ms)} | {track.name}</li>)}</ul></p>
            
            </>

            )
            
            }

            

            </> 
        );
    }
    return (<>not on client</>);

}

export default PlaylistTimer;
