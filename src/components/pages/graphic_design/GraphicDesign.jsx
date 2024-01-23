
import projection_cropped from "../../../images/graphic_design/projection-cropped.jpg"
import gunpoint_cropped from "../../../images/graphic_design/gunpoint-cropped.jpg";
import sidekick_tennessee from "../../../images/link_thumbnails/sidekick_cover.jpg";
import titles_in from "../../../images/link_thumbnails/titles_interpreted_in.png";
import inkbleed_still from "../../../images/link_thumbnails/inkbleed_2.jpg";
import inSideHouse from "../../../images/link_thumbnails/In_side house.jpg"

import sidekick_pdf from "/documents/Rise_Up_Second_Sidekick.pdf";

import { ImageLinkListElement } from "../../commonComponents";

const animationLinkInfo = {
    imgSource: inkbleed_still,
    altText: "A drawing of a small bird.",
    link: "/animation",
}

const postersLinkInfo = {
    imgSource: projection_cropped,
    altText: "Marker drawing depicting a girl floating down a river on a makeshift raft.",
    link: "/graphic_design/promotional_materials",
}

const sidekickLinkInfo = {
    imgSource: sidekick_tennessee,
    altText: "Watercolor of a person holding a mandolin",
    link: sidekick_pdf,
}

const deathtrapLinkInfo = {
    imgSource: gunpoint_cropped,
    altText: "Digital image of a silhouetted figure with a gun, with smoke billowing around",
    link: "/graphic_design/deathtrap",
}

const titlesLinkInfo = {
    imgSource: titles_in,
    altText: "Digital illustration of a girl writing letters",
    link: "/projects/titles_interpreted",
}

const inSideLinkInfo = {
    imgSource: inSideHouse,
    altText: "Ink drawing depicting a house.",
    link: "https://figments.princeton.edu/2021/04/29/in-side-alexandra-palocz/",
    title:"A short comic"
}


function GraphicDesignPage() {
    return (
        <>
        <h2> Visual Art & Graphic Design </h2>

        <ImageLinkListElement linkImageInfo={postersLinkInfo} title="Promotional Materials" >
           Show Posters and promotional digital graphics.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={animationLinkInfo} title="Animation" imageRight>
           Animated work, from small sketches to stop motion shorts. 
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={sidekickLinkInfo} title="Rise Up: Glitter and Gold"  outsideLink>
           Songbook created for Princeton Rise Up, for which I did layout and illustration in addition to collection/arrangement of songs.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={inSideLinkInfo} title="In/Side" outsideLink imageRight>
            A comic about quarantine in a haunted house, involving tea, puzzles, and a love of bird motifs.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={deathtrapLinkInfo} title="Deathtrap Window Cards">
            Window cards created as set dressing for Princeton Summer Theater's 2019 production of "Deathtrap"
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={titlesLinkInfo} title="Titles out of Context" imageRight >
            A collection of summaries and graphics inspired by taking the titles of my fellow undergraduate 
            students' final assignments out of context.
        </ImageLinkListElement>
        
        </>
    );
  }
  
  export default GraphicDesignPage;