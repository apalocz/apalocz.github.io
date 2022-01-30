
import projection_cropped from "../../images/graphic_design/projection-cropped.jpg"
import gunpoint_cropped from "../../images/graphic_design/gunpoint-cropped.jpg";

import { ImageLinkListElement } from "../../components/commonComponents";

const postersLinkInfo = {
    imgSource: projection_cropped,
    altText: "Marker drawing depicting a girl floating down a river on a makeshift raft.",
    link: "/graphic_design/promotional_materials",
}

const deathtrapLinkInfo = {
    imgSource: gunpoint_cropped,
    altText: "Photograph of a friendship bracelet on the ground, surrounded by pine needles",
    link: "/graphic_design/deathtrap",
}


function GraphicDesignPage() {
    return (
        <>
        <h2> Graphic Design </h2>

        <ImageLinkListElement linkImageInfo={postersLinkInfo} title="Promotional Materials" >
           Show Posters and promotional digital graphics.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={deathtrapLinkInfo} title="Deathtrap Window Cards" imageRight >
            Window cards created as set dressing for Princeton Summer Theater's 2019 production of "Deathtrap"

        </ImageLinkListElement>
        
        </>
    );
  }
  
  export default GraphicDesignPage;