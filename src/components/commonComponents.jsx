import { useState, useEffect, useRef } from "react";

import "./imageLinkListElementStyles.css"
import "./largeImageStyles.css"
import "./imageOverlayStyles.css"

// media width before we consider the 
const IMAGE_LINK_WIDTH_CUTOFF = 640;

// Component for a link with a caption, represented by a figure. 
export function FigureLink(props) {
    const {figureClassName} = props;
    const {link, imageLink, title, caption} = props.linkInfo;

    return (
    <figure className={figureClassName}>
         <a href={link} title={title} style={{backgroundImage: `url(${imageLink.src})`}} />
          <figcaption> {caption} </figcaption>
    </figure>

    )
}

export function OutsideLink(props) {
    const {link, linkTitle, text, children} = props;
    return <a href={link} title={linkTitle} target="_blank" rel="noopener noreferrer"> {text ?? children} </a>
}

// component for an element in a list page
// displays the link image on one side with the child text on the other

export function ImageLinkListElement(props) {
    const {imageRight, outsideLink, title, children} = props
    const {link, linkTitle, imgSource, altText} = props.linkImageInfo;

    const image = <img className="side-description-image" src={imgSource.src} alt={altText} />

    const imageLink = 
        <div className={!imageRight ? "side-description-link" : "side-description-link right-side-link"}>
            {outsideLink ? (<a href={link} title={linkTitle} target="_blank" rel="noopener noreferrer"> {image} </a>) : 
            (<a href={link} title={linkTitle}> {image} </a>)}
        </div>

    return (
        <div className={`side-description-container ${imageRight ? "right-description-container":"left-description-container"}`}>
            {imageLink}

            <div className={!imageRight ? "side-description right-side-description" : 
                                        "side-description left-side-description"} > 
                <h3> {title} </h3> 
                <i>{children} </i>
            </div>

        </div>

    )
}

export function LargeImage(props) {
    const {smallSource, largeSource, altText, fitContainer} = props
    const [largeImageLoaded, setLargeImageLoaded] = useState(false);
    const smallImg = useRef();

    const divClass = fitContainer ? "large-image-container large-image-fit-container" : "large-image-container";
    const smallClass = fitContainer ? "fit-container" : "";
    const largeClass = fitContainer ? "large-image fit-container" : "large-image";

    return (
        <div className={divClass}>
        <img src={smallSource.src} alt={"(small)" + altText} ref={smallImg} className={smallClass}/>
        <img src={largeSource.src} alt={altText} className={largeClass}
            style={{ opacity: largeImageLoaded ? 1: 0,
            width: smallImg.width, height: smallImg.height}}
            onLoad={() => setLargeImageLoaded(true)}/>
        </div>
    );
}


export function ImageRow(props) {
    const {sources, alts} = props

    const image_elements = []
    for (let i = 0; i < sources.length; i += 1) {
        const source = sources[i];
        const image = typeof(source.src) === "string" ? <img className="fit-container" src={source.src} alt={alts[i]} />
        : <LargeImage fitContainer smallSource={source.small} largeSource={source.large} altText={alts[i]}/>

        image_elements.push((<div key={i} className="row-image-container"> {image} </div>))
    }

    return (
        <div className="fit-container flexrow">
            {image_elements}
        </div>
  

    )
}

export function ImageOverlay(props) {
    const {image, alt, closeOverlay} = props;
    return <>
    <div className="image-overlay-greyout" onClick={closeOverlay}/>
    <div className="image-overlay">
        <div className="image-overlay-exit-button" onClick={closeOverlay}> X </div>
        <br/>
        <img className="image-overlay-image" src={image.src} alt={alt}/>
    </div>
    </>
  }