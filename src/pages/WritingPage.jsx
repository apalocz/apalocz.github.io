
import eigRaft from "../images/eig-raft.jpg"
import inSideHouse from "../images/In_side house.jpg"

import { ImageLinkListElement } from "../components/commonComponents";

const echoesLinkInfo = {
    imgSource: eigRaft,
    altText: "Icon depicting an open jar with light beams coming out of the top",
    link: "/echoes_in_glass",
    title:"An interactive story cycle"
}

const inSideLinkInfo = {
    imgSource: inSideHouse,
    altText: "Ink drawing depicting a house.",
    link: "https://figments.princeton.edu/2021/04/29/in-side-alexandra-palocz/",
    title:"A short comic"
}

function WritingPage() {
    return (
        <>
        <h2> Writing </h2>
        <br/>

        <ImageLinkListElement linkImageInfo={echoesLinkInfo} title="Echoes in Glass" >
            An interactive theatrical cycle of stories, poems, and songs that follows the tale of two sisters, a bargain, and a bag of salt.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={inSideLinkInfo} title="In/Side" imageRight outsideLink >
            A short comic about quarantine in a haunted house, involving tea, puzzles, and a love of bird motifs.
        </ImageLinkListElement>
        
        </>
    );
  }
  
  export default WritingPage;