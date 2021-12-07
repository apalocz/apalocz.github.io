

const soundcloudIframe = (<iframe className="centered" title="Echoes in Glass playlist on Soundcloud" width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" 
src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1359207007%3Fsecret_token%3Ds-y0DVENbc04L&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
);

function EchoesMusicPage() {
  return (
    <>
    <h2> Echoes in Glass: Recordings </h2>

    <hr/>
    {soundcloudIframe}

    <p> In 2021, I set out to make recordings of the songs from <i>Echoes in Glass </i>. With everyone in lockdown and scattered 
        across different locations, we recorded each part separately. The recording cast played a wide range of instuments,
        so I wove new parts into the songs, expanding on the arrangements from the live production. </p>
        
    <p> There are sections of the music where the audience is invited to join in, so I pulled together a virtual audience of 
        family, friends, and co-workers to sing along to the songs and send in short recordings. 
        Hearing their voices come together has been one of the best parts of the process, 
        and I am deeply grateful to all of them for being a part of this.
    </p>
    
    </>
  );
}

export default EchoesMusicPage;
