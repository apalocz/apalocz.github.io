

const soundcloudIframe = (<iframe className="centered" title="Echoes in Glass playlist on Soundcloud" width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" 
src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1359207007%3Fsecret_token%3Ds-y0DVENbc04L&color=%23ff5500&auto_play=false&hide_related=true&show_playcount=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&visual=false"></iframe>
);

function EchoesMusicPage() {
  return (
    <>
    <h2> Echoes in Glass: Recordings </h2>

    <hr/>
    {soundcloudIframe}

    <p> In 2021, I set out to make recordings of the songs and poems from <i>Echoes in Glass </i>. The recording cast plays 
        a wide range of instuments, so I took the opportunity to weave new parts into the songs, expanding on the 
        arrangements from the live production. </p>
        
    <p> With everyone in lockdown and scattered across the country, we recorded each part separately. 
        There are parts of the show where the audience is invited to join in, so I pulled together a virtual audience of 
        family, friends, and co-workers to sing along to the songs and send in short recordings. 
        Hearing their voices come together has been one of the best parts of the process, 
        and I am deeply grateful to all of them for being a part of this.
    </p>
    
    </>
  );
}

export default EchoesMusicPage;
