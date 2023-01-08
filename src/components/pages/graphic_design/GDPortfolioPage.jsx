
import eurydicePoster from "../../../images/graphic_design/Eurydice_Poster.jpg";
import eurydicePoster_small from "../../../images/graphic_design/Eurydice_Poster-small.jpg";
import skmPoster from "../../../images/graphic_design/She_Kills_Monsters.jpg";
import skmPoster_small from "../../../images/graphic_design/She_Kills_Monsters-small.jpg";
import intimeAltLogo from "../../../images/graphic_design/intime alt logo - color.png";

import nightVision from "../../../images/graphic_design/pst_night_vision.jpg";
import teaParty from "../../../images/graphic_design/pst_tea_party.jpg";
import loti from "../../../images/graphic_design/Luck of the Irish.jpg";
import twentyFourHour from "../../../images/graphic_design/twenty_four.jpg";
import spfGif from "../../../images/graphic_design/SPF_2019_animation.gif";
import carrie from "../../../images/graphic_design/SPF_2019_Carrie.png";
import projection from "../../../images/graphic_design/SPF_2019_Projection.png"
import laundry from "../../../images/graphic_design/SPF_2019_Laundry.png"

import { LargeImage, ImageRow } from "../../commonComponents";


import './GDPortfolioPage.css'

const imagesInfo = [
    {images: [{small: eurydicePoster_small,large: eurydicePoster}], alts: ["< Eurydice Poster >"], 
        caption: `Show poster for Theatre Intime's 2019 production of "Eurydice"`},
    {images: [{small: skmPoster_small, large: skmPoster}], alts: ["< Poster for She Kills Monsters  >"], 
        caption: `Show poster for Theatre Intime's 2017 production of "She Kills Monsters"`},
    {images: [nightVision], alts: ["Night Vision"], 
        caption: `Digital graphic for Princeton Summer Theater's 2020 production of "Night Vision"`},
    {images: [teaParty], alts: ["< A Curious Tea Party>"], 
        caption: `Digital graphic for Princeton Summer Theater's 2020 children's show`},
    {images: [intimeAltLogo], alts: ["< Alternate logo for Theatre Intime >"], 
        caption: `Alternate logo designed for Theatre Intime`},
    {images: [loti], alts: ["<Luck of the Irish>"], 
        caption: `Teaser graphic for Theatre Intime's 2018 production of "Luck of the Irish"`},
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

    return (
    <figure className="vp-height">
        <div className="flexcol">
                <ImageRow sources={sources} alts={alts} />
            <figcaption> {caption} </figcaption>
        </div>
    </figure>
    )
}

function GDPortfolioPage() {

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
    <h2> Promotional Graphics </h2>
        <div className="centered">
            {imagesContent}
        </div>
    </>
  );
}

export default GDPortfolioPage;
