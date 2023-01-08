
import allyAccordion from "../../images/eig_show_photos/ally-accordion.jpg"
import orgamismQuestion from "../../images/link_thumbnails/organism-question.jpg"
import skyCover from "../../images/link_thumbnails/Sky cover.jpg"

import { ImageLinkListElement } from "../commonComponents";

const echoesLinkInfo = {
    imgSource: allyAccordion,
    altText: "",
    link: "/echoes_in_glass/music",
    title:"Music from the interactive story cycle"
}

const tardigradeLinkInfo = {
    imgSource: orgamismQuestion,
    altText: "Image of four organisms ",
    link: "/organism_song",
    title:"What Organism Would You Be?"
}

const coversLinkInfo = {
    imgSource: skyCover,
    altText: "Image of a figure playing guitar",
    link: "https://www.youtube.com/channel/UCwzjNt2J0ppFYPm99UgpJVQ",
    title:"Cover songs"
}

function MusicPage() {
    return (
        <>
        <h2> Music </h2>

        <ImageLinkListElement linkImageInfo={echoesLinkInfo} title="Echoes in Glass: Recordings" >
           Songs and poems from the interactive story cycle <a href="/echoes_in_glass"> <i> Echoes in Glass</i></a>.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={coversLinkInfo} title="Song Covers"  outsideLink imageRight>
            Arrangements and covers of various songs, usually involving a combination of bassoon, recorder, guitar, and voice.
        </ImageLinkListElement>
        
        </>
    );
  }
  
  export default MusicPage;