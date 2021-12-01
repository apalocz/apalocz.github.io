import { NavLink } from "react-router-dom";

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