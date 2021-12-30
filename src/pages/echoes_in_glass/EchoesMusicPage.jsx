import { NavLink } from "react-router-dom";

const soundcloudIframe = (<iframe className="centered" title="Echoes in Glass playlist on Soundcloud" 
  width="100%" height="350" scrolling="no" frameborder="no" allow="autoplay" 
src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1366334923%3Fsecret_token%3Ds-P8oKBPmQ6ms&color=%23ff5500&auto_play=false&hide_related=true&show_playcount=false&show_comments=false&show_user=false&liking=fals‌​e&show_reposts=false&show_teaser=false&visual=false&following=false"></iframe>
);

function EchoesMusicPage() {
  return (
    <>
    <h2> Echoes in Glass: Recordings </h2>

    <hr/>
    {soundcloudIframe}

    <p> In 2021, I directed and produced a cast album of the songs and poems from <NavLink 
      to="/echoes_in_glass"> <i>Echoes in Glass</i></NavLink>. The recording cast plays 
        a wide range of instuments, so I took the opportunity to weave new parts into the songs, expanding on the 
        arrangements from the live production. </p>
        
    <p> With everyone in lockdown and scattered across the country, we recorded each part separately. 
        There are parts of the show where the audience is invited to join in, so I pulled together a virtual audience of 
        family, friends, and co-workers to sing along to the songs and send in short recordings. 
        Hearing their voices come together has been one of the best parts of the process, 
        and I am deeply grateful to all of them for being a part of this.
    </p>



    <h3>Cast:</h3>

    <ul> 
        <li> <b>Spirit of Sea:</b> Ally Wonski </li>
        <li> <b>Spirit of Moon/Archivist:</b> Muniyat Choudhury </li>
        <li>  <b>Audience Voices:</b>  Paige Allen, P. B., Hannah Chomiczewski, Lief Dubin, Milan Eldridge, Mel Hornyak, {" "}
          Tiffany Huang, Elliot Lee, Holden Lee, Shelly Manber, Katherine Mayer, Alexandra Palocz, Stephanie Palocz,  {" "}
          Richard Peng, Thiago Tarraf Varella, and Anna Whittell</li>
    </ul>

    <h3>Instruments:</h3>
    <ul> 
        <li> <b>Muniyat Choudhury:</b> Kalimba/Lyre Harp </li>
        <li> <b>Ally Wonski:</b> Accordion/Violin </li>
        <li> <b>Mel Hornyak:</b> Violin </li>
        <li>  <b>Alexandra Palocz:</b>  Guitar/Percussion</li>
    </ul>


    
    </>
  );
}

export default EchoesMusicPage;
