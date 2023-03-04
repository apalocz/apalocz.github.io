
import projection_cropped from "../../../images/graphic_design/projection-cropped.jpg"
import gunpoint_cropped from "../../../images/graphic_design/gunpoint-cropped.jpg";
import sidekick_tennessee from "../../../images/link_thumbnails/sidekick_cover.jpg";
import titles_in from "../../../images/link_thumbnails/titles_interpreted_in.png";

import sidekick_pdf from "/documents/Rise_Up_Second_Sidekick.pdf";

import { ImageLinkListElement } from "../../commonComponents";

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


function GraphicDesignPage() {
    return (
        <>
        <h2> Graphic Design </h2>

        <ImageLinkListElement linkImageInfo={postersLinkInfo} title="Promotional Materials" >
           Show Posters and promotional digital graphics.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={sidekickLinkInfo} title="Rise Up: Glitter and Gold" imageRight outsideLink>
           Songbook created for Princeton Rise Up, for which I did layout and illustration in addition to collection/arrangement of songs.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={deathtrapLinkInfo} title="Deathtrap Window Cards" >
            Window cards created as set dressing for Princeton Summer Theater's 2019 production of "Deathtrap"
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={titlesLinkInfo} title="Titles out of Context" imageRight>
            A collection of summaries and graphics inspired by taking the titles of my fellow undergraduate 
            students' final assignments out of context.
        </ImageLinkListElement>
        
        </>
    );
  }
  
  export default GraphicDesignPage;