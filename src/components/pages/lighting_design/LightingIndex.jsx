import eurydiceImg from "../../../images/eurydice_show_photos/eurydice-in.jpg";
import legallyImage from "../../../images/legally_blonde_show_photos/legally-in-small.jpg";
import stopKissImage from "../../../images/stop_kiss_show_photos/stopkiss-in-small.jpg";


import { FigureLink } from "../../commonComponents";
import './LightingIndex.css';


const lightingPageList = [
  {link: "/lighting/eurydice", imageLink: eurydiceImg, 
      title:"Theatre Intime's 2019 production of Eurydice", caption:"Eurydice"},
  {link: "/lighting/legally_blonde", imageLink: legallyImage, 
      title:"Princeton Program in Theater's 2018 production of Legally Blonde", caption:"Legally Blonde"},
  {link: "/lighting/stop_kiss", imageLink: stopKissImage, 
      title:"Theatre Intime's 2018 production of Stop Kiss", caption:"Stop Kiss"}
]

function LightingIndex() {
  return (
    <>
      <h2> Lighting Design </h2>
      <div className="light-menu flexrow">
      {lightingPageList.map(linkInfo => (<FigureLink key={linkInfo.link} linkInfo={linkInfo} />))}
      </div>

    </>
  );
}

export default LightingIndex;