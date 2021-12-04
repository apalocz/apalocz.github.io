import { FigureLink } from "../../components/commonComponents";
import './LightingIndex.css';


const lightingPageList = [
  {link: "/lighting/eurydice", className:"eurydice-link", 
      title:"Theatre Intime's 2019 production of Eurydice", caption:"Eurydice"},
  {link: "/lighting/legally_blonde", className:"legally-link", 
      title:"Princeton Program in Theater's 2018 production of Legally Blonde", caption:"Legally Blonde"},
  {link: "/lighting/stop_kiss", className:"stopkiss-link", 
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
