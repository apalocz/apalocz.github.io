
import cervical6 from "../../../images/where_computers_draw_lines/cervical_6.png";
import scissorsIcon from "../../../images/link_thumbnails/scissors-congruence-icon.jpg"
import kapwingLogo from "../../../images/link_thumbnails/kapwing_logo.png"


import { ImageLinkListElement } from "../../commonComponents";

const kapwingLinkInfo = {
    imgSource: kapwingLogo,
    altText: "Kapwing",
    link: "https://www.kapwing.com/",
}

const lineDrawingLinkInfo = {
    imgSource: cervical6,
    altText: "Predicted drawing of a cervival bone",
    link: "/where_computers_draw_lines",
}

const scissorsCongruenceLinkInfo = {
    imgSource: scissorsIcon,
    altText: "An area divided into blue and green polygons ",
    link: "/scissors_congruence",
}

function CSPage() {
    return (
        <>
        <h2> Computer Science </h2>

        <ImageLinkListElement linkImageInfo={kapwingLinkInfo} title="Kapwing" outsideLink >
        Collaborative browser-based video editor where I've been working as a full-stack engineer since 2020. Features I have implemented include {" "}
             <a href="https://www.kapwing.com/tools/remove-background" target="_blank" rel="noopener noreferrer" >
                 removing video backgrounds</a> {" "}
            and <a href="https://www.kapwing.com/blog/green-screen-in-browser/" target="_blank" rel="noopener noreferrer">
                green screen/chroma key</a>.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={lineDrawingLinkInfo} title="Where Computers Draw Lines" imageRight >
            Senior thesis in computer science, examining application of deep neural networks in non-photorealistic rendering.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={scissorsCongruenceLinkInfo } title="Scissors Congruence" >
            An interactive demonstration of polyon equidecomposition.
        </ImageLinkListElement>

        
        </>
    );
  }
  
  export default CSPage;