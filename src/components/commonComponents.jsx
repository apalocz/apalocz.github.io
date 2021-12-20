import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";

import "./imageLinkListElementStyles.css"
import "./largeImageStyles.css"

// Component for a link with a caption, represented by a figure. 
export function FigureLink(props) {
    const {figureClassName} = props;
    const {link, className, title, caption} = props.linkInfo;

    return (
    <figure className={figureClassName}>
         <NavLink to={link} title={title} className={`${className}`} />
          <figcaption> {caption} </figcaption>
    </figure>

    )
}

export function OutsideLink(props) {
    const {link, linkTitle, children} = props;
    return <a href={link} title={linkTitle} target="_blank" rel="noopener noreferrer"> {children} </a>
}

// component for an element in a list page
// displays the link image on one side with the child text on the other

export function ImageLinkListElement(props) {
    const {imageRight, outsideLink, title, children} = props
    const {link, linkTitle, imgSource, altText} = props.linkImageInfo;

    const image = <img className={!imageRight ? "side-description-link" : "side-description-link right-side-link"} 
    src={imgSource} alt={altText} />

    const imageLink = 
        outsideLink ? (<a href={link} title={linkTitle} target="_blank" rel="noopener noreferrer"> {image} </a>) : 
        (<NavLink to={link} title={linkTitle}> {image} </NavLink>)

    return (
        <>
        <div className="side-description-container">
        {!imageRight && imageLink}

        <div className="relative">
        <div className={!imageRight ? "side-description right-side-description" : 
                                      "side-description left-side-description"} > 
            <h3> {title} </h3> 
            {children} 
        </div>
        </div>

        {imageRight && imageLink}
        </div>

        </>

    )
}

export function LargeImage(props) {
    const {smallSource, largeSource, altText, fitContainer} = props
    const [largeImageLoaded, setLargeImageLoaded] = useState(false);
    const smallImg = useRef();

    const divClass = fitContainer ? "large-image-container fit-container" : "large-image-container";
    const smallClass = fitContainer ? "fit-container" : "";
    const largeClass = fitContainer ? "large-image fit-container" : "large-image";

    return (
        <div className={divClass}>
        <img src={smallSource} alt={"(small)" + altText} ref={smallImg} className={smallClass}/>
        <img src={largeSource} alt={altText} className={largeClass}
            style={{ opacity: largeImageLoaded ? 1: 0,
            width: smallImg.width, height: smallImg.height}}
            onLoad={() => setLargeImageLoaded(true)}/>
        </div>
    );
}