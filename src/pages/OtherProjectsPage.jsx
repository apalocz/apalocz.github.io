
import fireline from "../images/fireline-title.jpg"
import colors from "../images/colors-talk.jpg"

import { ImageLinkListElement } from "../components/commonComponents";

const firelineLinkInfo = {
    imgSource: fireline,
    altText: "Title screen from the game Fireline",
    link: "/fireline",
    title:"An climate change game"
}

const colorsLinkInfo = {
    imgSource: colors,
    altText: "Picture of colored lights, with hex codes underneath",
    link: "https://www.youtube.com/watch?v=L9mnMdhpSqc",
    title:"A presentation on colors"
}

function OtherProjectsPage() {
    return (
        <>
        <h2> Other Projects </h2>

        <ImageLinkListElement linkImageInfo={colorsLinkInfo} title="Roses Are Red, Violets Aren't Blue " outsideLink >
         Presentation for Princeton's StudioLab: A broad, multidisciplinary dive into talking about color, inspired by thinking about the intersections between theater lighting design and computer graphics.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={firelineLinkInfo} title="Fireline" imageRight >
            A short strategy game about fighting wildfires in California in response to the ongoing effects of climate change.
        </ImageLinkListElement>
        
        </>
    );
  }
  
  export default OtherProjectsPage;