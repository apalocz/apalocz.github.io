import { NavLink } from "react-router-dom";
import {OutsideLink} from "../../components/commonComponents"

import eig1 from "../../images/eig_show_photos/eig-1.jpg";
import eig2 from "../../images/eig_show_photos/eig-2.jpg";
import eig3 from "../../images/eig_show_photos/eig-3.jpg";
import eig4 from "../../images/eig_show_photos/eig-4.jpg";
import eig5 from "../../images/eig_show_photos/eig-5.jpg";
import eig6 from "../../images/eig_show_photos/eig-6.jpg";
import eig7 from "../../images/eig_show_photos/eig-7.jpg";
import eig8 from "../../images/eig_show_photos/eig-8.jpg";

const alt_text = "< A photograph from the Program in Theatre's 2019 production of Echoes in Glass  >";
const showImageList = [eig1, eig2, eig3, eig4, eig5, eig6, eig7, eig8];

function EchoesPage() {
  return (
    <>
    <h2> Echoes in Glass </h2>

    <p> <i>Echoes in Glass </i> is an interactive cycle of original stories, poems, and songs, 
        centered on themes of connection, love, 
        and loss. Bringing together the realms of theater, oral storytelling, and interactive 
        experience, it invites audiences to enter a world of monsters, myths, and memories, 
        where stories are distilled into jars and spirits are invoked to help bring them to life. 
        As spirits, the audience is given the agency to choose how they will move through the world 
        — as watchers, keepers, or active participants, they follow two leader-spirits and a human 
        archivist as they delve together through a collection of story-jars in an attempt to untangle 
        and understand the past. </p>


    <h3> Hear the Songs </h3>
      Over the second half of 2021, I've been working on creating cast recordings of the songs and poems from the show. {" "}
    <NavLink to="music">
      Learn more about the process and listen to them here.</NavLink>

    <h3> Read an Excerpt </h3>
    <p> An excerpt of <i>Echoes in Glass</i> was published in the literary magazine <i> Figments </i> in 
        February 2019. <a href="https://figments.princeton.edu/2020/02/10/andgiet-jar-9-the-wellwoman-alexandra-palocz/"
        target="blank">
        The excerpt can be found here. </a> </p>

    <h3> Production History </h3>
    <p> In addition to writing/composing the piece, I directed and designed a production of <i> Echoes in Glass </i>
        with the Princeton Program in Theater in December 2019 (pictured below), as my thesis work 
         for Princeton's theater certificate program. </p>
    
    <ul> 
        <li> Set/Prop Design, Costume Design, and Sound Design by Alexandra Palocz </li>
        <li> Lighting Design by <OutsideLink link="https://www.trinityrep.com/people/chamari-white-mink/"> Chamari White-Mink </OutsideLink></li>
        <li> Cast: <OutsideLink link="https://www.wynningedu.com/about"> Zyan Wynn</OutsideLink> (Archivist), {" "}
            Tiffany Huang (Spirit of Sea), {" "}
          <OutsideLink link="https://linktr.ee/paranorm_ally"> Ally Wonski</OutsideLink> (Spirit of Moon) </li>
        <li> Photos by <OutsideLink link="https://ericacardenas.com/"> Erica Cardenas </OutsideLink> / {" "}
          Lewis Center for the Arts © 2019 The Trustees of Princeton University </li>
    </ul>

    {showImageList.map(source => <img src={source} alt={alt_text} key={source}/>)}

    </>
  );
}

export default EchoesPage;
