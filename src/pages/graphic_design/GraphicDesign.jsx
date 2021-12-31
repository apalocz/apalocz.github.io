
import eurydicePoster from "../../images/graphic_design/Eurydice_Poster.jpg";
import eurydicePoster_small from "../../images/graphic_design/Eurydice_Poster-small.jpg";
import skmPoster from "../../images/graphic_design/She_Kills_Monsters.jpg";
import skmPoster_small from "../../images/graphic_design/She_Kills_Monsters-small.jpg";
import murderGame from "../../images/graphic_design/Murder_Game.png";
import murderGame_small from "../../images/graphic_design/Murder_Game-small.jpg";
import inForTheKill from "../../images/graphic_design/In_for_the_Kill.png";
import inForTheKill_small from "../../images/graphic_design/In_for_the_Kill-small.jpg";
import gunpoint from "../../images/graphic_design/Gunpoint.png";
import gunpoint_small from "../../images/graphic_design/Gunpoint-small.jpg";
import murderersChild from "../../images/graphic_design/Murderer's Child.png";
import murderersChild_small from "../../images/graphic_design/Murderer's Child-small.jpg";
import intimeAltLogo from "../../images/graphic_design/intime alt logo - color.png";

import nightVision from "../../images/graphic_design/pst_night_vision.jpg";
import teaParty from "../../images/graphic_design/pst_tea_party.jpg";
import twentyFourHour from "../../images/graphic_design/twenty_four.jpg";
import spfGif from "../../images/graphic_design/SPF_2019_animation.gif";
import carrie from "../../images/graphic_design/SPF_2019_Carrie.png";
import projection from "../../images/graphic_design/SPF_2019_Projection.png"
import laundry from "../../images/graphic_design/SPF_2019_Laundry.png"

import { LargeImage } from "../../components/commonComponents";


import './GraphicDesign.css'

const imagesInfo = [
    {images: [{small: eurydicePoster_small,large: eurydicePoster}], alts: ["< Eurydice Poster >"], 
        caption: `Show poster for Theatre Intime's 2019 production of "Eurydice"`},
    {images: [{small: skmPoster_small, large: skmPoster}], alts: ["< Poster for She Kills Monsters  >"], 
        caption: `Show poster for Theatre Intime's 2017 production of "She Kills Monsters"`},
    {images: [{small: inForTheKill_small, large: inForTheKill}, {small: murderGame_small, large: murderGame}, 
        {small: gunpoint_small, large: gunpoint}, {small: murderersChild_small, large: murderersChild}], 
        alts: ["< In for the Kill>","<Murder Game>", "<Gunpoint>",  "<Murderer's Child>"], 
        caption: `Window cards created as set dressing for Princeton Summer Theater's 2019 production of "Deathtrap"`},
    {images: [teaParty, nightVision], 
            alts: ["< A Curious Tea Party>", "Night Vision"], 
            caption: `Digital graphics for Princeton Summer Theater's 2020 virtual season`},
    {images: [intimeAltLogo], alts: ["< Alternate logo for Theatre Intime >"], 
        caption: `Alternate logo designed for Theatre Intime`},
    {images: [twentyFourHour], alts: ["< 24 Hour Play Festival Graphic>"], 
        caption: `Teaser graphic for Theatre Intime's 24 Hour Play Festival in 2017`},
    {images: [spfGif], alts: ["< SPF animation>"], 
        caption: `Animation for Theatre Intime's 2018 Student Playwrights Festival`},
    {images: [carrie, projection, laundry], alts: ["< Carrie Poster >", "Projection Poster", "Laundry Poster"], 
        caption: `Show posters for Theatre Intime's 2018 Student Playwrights Festival`},
  ]


function ImageWithCaption(props) {
    const {source, alt, caption} = props;
    const image = typeof(source) === "string" ? <img className="fit-container" src={source} alt={alt} />
        : <LargeImage fitContainer smallSource={source.small} largeSource={source.large} altText={alt}/>

    return (
    <figure className="vp-height">
        <div className="flexcol">
            {image}
                <figcaption> {caption} </figcaption>
        </div>
    </figure>

    )
}

function ImageCaptionRow(props) {
    const {sources, alts, caption} = props

    const image_elements = []
    for (let i = 0; i < sources.length; i += 1) {
        const source = sources[i];
        const image = typeof(source) === "string" ? <img className="fit-container" src={source} alt={alts[i]} />
        : <LargeImage fitContainer smallSource={source.small} largeSource={source.large} altText={alts[i]}/>

        image_elements.push((<div key={i} className="row-image-container"> {image} </div>))
    }

    return (
    <figure className="vp-height">
        <div className="flexcol">
                <div className="fit-container flexrow">
                    {image_elements}
                </div>
            <figcaption> {caption} </figcaption>
        </div>
    </figure>
    )
}

function GraphicDesignPage() {

    const imagesContent = []
    for (let i = 0; i < imagesInfo.length; i += 1) {
        const {images, alts, caption} = imagesInfo[i];
        imagesContent.push(<hr key={i}/>);
        if (images.length > 1) {
            imagesContent.push(<ImageCaptionRow sources={images} alts={alts} caption={caption} key={caption} />);
        }
        else {
            imagesContent.push(<ImageWithCaption source={images[0]} alt={alts[0]} caption={caption} key={caption}/>);
        }
    }


  return (
    <>
    <h2> Graphic Design </h2>
        <div className="centered">
            {imagesContent}
        </div>
    </>
  );
}

export default GraphicDesignPage;
