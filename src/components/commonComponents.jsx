import { NavLink } from "react-router-dom";
import { useState, useRef } from "react/cjs/react.development";

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
    const {smallSource, largeSource, altText} = props
    const [largeImageLoaded, setLargeImageLoaded] = useState(false);
    const smallImg = useRef();

    return (
        <div className="large-image-container">
        <img src={smallSource} alt={"(small)" + altText} ref={smallImg}/>
        <img src={largeSource} alt={altText} className="large-image" 
            style={{ opacity: largeImageLoaded ? 1: 0,
            width: smallImg.width, height: smallImg.height}}
            onLoad={() => setLargeImageLoaded(true)}/>
        </div>
    );
}