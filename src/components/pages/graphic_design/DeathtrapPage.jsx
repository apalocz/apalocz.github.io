

import murderGame from "../../../images/graphic_design/Murder_Game.png";
import murderGame_small from "../../../images/graphic_design/Murder_Game-small.jpg";
import inForTheKill from "../../../images/graphic_design/In_for_the_Kill.png";
import inForTheKill_small from "../../../images/graphic_design/In_for_the_Kill-small.jpg";
import gunpoint from "../../../images/graphic_design/Gunpoint.png";
import gunpoint_small from "../../../images/graphic_design/Gunpoint-small.jpg";
import murderersChild from "../../../images/graphic_design/Murderer's Child.png";
import murderersChild_small from "../../../images/graphic_design/Murderer's Child-small.jpg";

import deathtrapWide from "../../../images/deathrap_show_photos/deathtrap-wide.jpg";
import deathtrapStageLeft from "../../../images/deathrap_show_photos/deathtrap-stage-left.jpg";
import deathtrapStageRight from "../../../images/deathrap_show_photos/deathtrap-stage-right.jpg";
import deathtrap4 from "../../../images/deathrap_show_photos/deathtrap4.jpg";


import { ImageRow } from "../../commonComponents";



const deathrapInfo =     {sources: [{small: inForTheKill_small, large: inForTheKill}, {small: murderGame_small, large: murderGame}, 
    {small: gunpoint_small, large: gunpoint}, {small: murderersChild_small, large: murderersChild}], 
    alts: ["< In for the Kill>","<Murder Game>", "<Gunpoint>",  "<Murderer's Child>"], 
    caption: `Window cards created as set dressing for Princeton Summer Theater's 2019 production of "Deathtrap"`}


function DeathtrapPage() {

  return (
    <>
    <h2> Deathtrap Window Cards </h2>

        <p>
            During my time as Assistant Technical Director at Princeton Summer Theater in 2019, I was asked to design a series
        {" "} of four window cards as set dressing for the Ira Levin thriller "Deathtrap".
        </p>
            
        <ImageRow {...deathrapInfo} />
            
        <p> "Deathtrap" takes place in the study of washed-up playwright Syndey Bruhl, and we wanted the window cards to tell the 
        {" "} story of his career. The script mentions four of Sidney Bruhl's fictional plays, the most important of which is 
        {" "} "The Murder Game," a smash hit thriller whose success he has been unable to replicate since. "In for the Kill" is
        {" "} referenced as an earler, non-commercial predecessor ro "The Murder Game", while "Murderer's Child" and "Gunpoint" are 
        {" "} more recent efforts. </p>
            
        <p> In addition to the window cards, the script specifies that the study walls are decorated with "a collection of guns, handcuffs, 
        {" "} maces, broadswords, and battle-axes," some of which are props from Bruhl's previous plays. To make this connection, we chose 
        {" "} to incorporate the weapons in the set into the graphics for the window cards. The prop dagger from "The Murder Game" and the axe 
        {" "} associated with "In for the Kill" both play a key role in the plot, so I made sure for those posters that the depicted weapons
        {" "} would be big enough to be recognizeable as matching the physical props.
            </p>

        <p>
        {" "} I wanted the window cards to have a cohesive style and color scheme, matching the overall look of the set, while still 
        {" "} standing out individually. The main exception is "Murderer's Child" --- since it is singled out as being a 
        {" "} poor attempt at recapturing the glory of "The Murder Game," I had it mimic its predecessor's color palette. 
        </p>
            
        <p> Here are the window cards in context as they appeared in the show: </p>

        <div className="centered" >

            <img src={deathtrapStageRight} alt={`A man standing over a body"`} style={{maxWidth: "100%"}}/>
            <br/><br/>
            <img src={deathtrapStageLeft} alt={"Two men sitting at a desk, with posters beind them"} style={{maxWidth: "100%"}}/>
            <br/><br/>
            <img src={deathtrap4} alt={`A woman pointing with a close view of the wall behind her"`} style={{maxWidth: "100%"}}/>
            <br/><br/>
            <img src={deathtrapWide} alt={`Wide view of the set of Princeton Summer Theater's 2019 production of "Deathtrap"`} 
            style={{maxWidth: "100%"}}/>
        </div>
       
    </>
  );
}

export default DeathtrapPage;
