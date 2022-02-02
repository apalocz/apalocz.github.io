import { NavLink } from "react-router-dom";


const spotifyIframe = (<iframe className="centered"  title="Echoes in Glass playlist on Spotify" 
src="https://open.spotify.com/embed/album/4Uo3jlWss05KWvrBk07Ejt?utm_source=generator" 
width="100%" height="380" frameBorder="0" allowfullscreen="" 
allow="autoplay;"></iframe>)

function EchoesMusicPage() {
  return (
    <>
    <h2> Echoes in Glass: Recordings </h2>

    <hr/>
    {spotifyIframe}

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
