
import eigRaft from "../images/eig-raft.jpg"
import inThePines from "../images/in_the_pines_photo.jpg"
import inSideHouse from "../images/In_side house.jpg"
import wordJar from "../images/patchwork_poems/circle-word-jar.jpg"

import { ImageLinkListElement } from "../components/commonComponents";

const echoesLinkInfo = {
    imgSource: eigRaft,
    altText: "Marker drawing depicting a girl floating down a river on a makeshift raft.",
    link: "/echoes_in_glass",
    title:"An interactive story cycle"
}

const inThePinesLinkInfo = {
    imgSource: inThePines,
    altText: "Photograph of a friendship bracelet on the ground, surrounded by pine needles",
    link: "https://in-the-pines.captivate.fm/",
    title:"A short play"
}

const inSideLinkInfo = {
    imgSource: inSideHouse,
    altText: "Ink drawing depicting a house.",
    link: "https://figments.princeton.edu/2021/04/29/in-side-alexandra-palocz/",
    title:"A short comic"
}

const patchworkPoemsLinkInfo = {
    imgSource: wordJar,
    altText: "Photograph of a jar filled with cut-out lines of poetry",
    link: "/patchwork_poems",
    title:"A series of poems reworked into new forms"
}

function WritingPage() {
    return (
        <>
        <h2> Writing </h2>

        <ImageLinkListElement linkImageInfo={inThePinesLinkInfo} title="In the Pines" outsideLink>
           <i>You go in together. You come out alone. </i> A short play originally selected for Theatre Intime's Student {" "}
           Playwrights Festival in 2020, produced as an audio play instead due to the pandemic.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={inSideLinkInfo} title="In/Side" outsideLink imageRight >
            A comic about quarantine in a haunted house, involving tea, puzzles, and a love of bird motifs.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={echoesLinkInfo} title="Echoes in Glass">
            An interactive theatrical cycle of stories, poems, and songs that follows the tale of two sisters, a bargain, and a bag of salt.
        </ImageLinkListElement>

        <ImageLinkListElement linkImageInfo={patchworkPoemsLinkInfo} title="Patchwork Poems" imageRight>
            A series of poems created by repurposing cut-out lines from a collection of love poetry.
        </ImageLinkListElement>
        
        </>
    );
  }
  
  export default WritingPage;