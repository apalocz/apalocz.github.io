
import eurydicePoster from "../../images/graphic_design/Eurydice_Poster.jpg";
import skmPoster from "../../images/graphic_design/She_Kills_Monsters.jpg";
import inForTheKill from "../../images/graphic_design/In_for_the_Kill.png";
import gunpoint from "../../images/graphic_design/Gunpoint.png";
import intimeAltLogo from "../../images/graphic_design/intime alt logo - color.png";
import twentyFourHour from "../../images/graphic_design/twenty_four.jpg";
import spfGif from "../../images/graphic_design/SPF_2019_animation.gif";
import carrie from "../../images/graphic_design/SPF_2019_Carrie.png";
import projection from "../../images/graphic_design/SPF_2019_Projection.png"
import laundry from "../../images/graphic_design/SPF_2019_Laundry.png"


import './GraphicDesign.css'

const imagesInfo = [
    {images: [eurydicePoster], alts: ["< Eurydice Poster >"], 
        caption: `Show poster for Theatre Intime's 2019 production of "Eurydice"`},
    {images: [skmPoster], alts: ["< Poster for She Kills Monsters  >"], 
        caption: `Show poster for Theatre Intime's 2017 production of "She Kills Monsters"`},
    {images: [inForTheKill, gunpoint], alts: ["< In for the Kill Poster >", "< Gunpoint Poster>"], 
        caption: `Window cards for "In For the Kill" and "Gunpoint". 
                 Created as set dressing for Princeton Summer Theater's 2019 production of "Deathtrap`},
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

    return (
    <figure className="vp-height">
        <div className="flexcol">
            <img className="fit-container" src={source} alt={alt} />
                <figcaption> {caption} </figcaption>
        </div>
    </figure>

    )
}

function ImageCaptionRow(props) {
    const {sources, alts, caption} = props

    const image_elements = []
    for (let i = 0; i < sources.length; i += 1) {
        image_elements.push((<div key={i}> <img className="fit-container" src={sources[i]} alt={alts[i]}/> </div>))
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
            imagesContent.push(<ImageCaptionRow sources={images} alts={alts} caption={caption} key={caption}/>);
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