
import fireline from "../../images/link_thumbnails/fireline-title.jpg"
import colors from "../../images/link_thumbnails/colors-talk.jpg"
import starBlanketCropped from "../../images/star_blanket/star_blanket_cropped.jpg"
import skyCover from "../../images/link_thumbnails/Sky cover.jpg"

import { ImageLinkListElement } from "../commonComponents";

const coversLinkInfo = {
    imgSource: skyCover,
    altText: "Image of a figure playing guitar",
    link: "https://www.youtube.com/channel/UCwzjNt2J0ppFYPm99UgpJVQ",
    title:"Cover songs"
}


const firelineLinkInfo = {
    imgSource: fireline,
    altText: "Title screen from the game Fireline",
    link: "/games/fireline",
    title:"An climate change game"
}

const colorsLinkInfo = {
    imgSource: colors,
    altText: "Picture of colored lights, with hex codes underneath",
    link: "https://www.youtube.com/watch?v=L9mnMdhpSqc",
    title:"A presentation on colors"
}

const starLinkInfo = {
    imgSource: starBlanketCropped,
    altText: "Close-up of black cloth with embroidered stars",
    link: "/projects/star_blanket",
}

function OtherProjectsPage() {
    return (
        <>
        <h2> Other Projects </h2>

        <ImageLinkListElement linkImageInfo={coversLinkInfo} title="Song Covers" outsideLink >
            Arrangements and covers of various songs, usually involving a combination of bassoon, recorder, guitar, and voice.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={starLinkInfo} title="Star Blanket" imageRight>
            A tapestry blanket embroidered with a planisphere of the stars of the Northern Hemisphere.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={firelineLinkInfo} title="Fireline" >
            A short strategy game about fighting wildfires in California in response to the ongoing effects of climate change.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={colorsLinkInfo} title="Roses Are Red, Violets Aren't Blue " outsideLink imageRight>
         Presentation for Princeton's StudioLab: A broad, multidisciplinary dive into talking about color, inspired by thinking about the intersections between theater lighting design and computer graphics.
        </ImageLinkListElement>
        
        </>
    );
  }
  
  export default OtherProjectsPage;