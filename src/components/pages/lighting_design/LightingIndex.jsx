import cherrywoodImage from "/src/images/lighting_thumbnails/cherrywood-in.jpg";
import littleWomenImage from "/src/images/lighting_thumbnails/little-women-in.jpg";
import passageImage from "/src/images/lighting_thumbnails/passage-in.jpg";
import afterlifeImage from "/src/images/lighting_thumbnails/afterlife-in.jpg";
import batsImage from "/src/images/lighting_thumbnails/bats_in.jpg";
import noGutsImage from "/src/images/lighting_thumbnails/no-guts-in.jpg";
import eurydiceImg from "/src/images/eurydice_show_photos/eurydice-in.jpg";
import legallyImage from "/src/images/lighting_thumbnails/legally-in.jpg";
import stopKissImage from "/src/images/lighting_thumbnails/stopkiss-in.jpg";


import { FigureLink } from "../../commonComponents";
import './LightingIndex.css';



const description = "2024 production of Passage at the Meisner Studio";

const lightingPageList = [
  {link: "/lighting/cherrywood", imageLink: cherrywoodImage, 
    title:"2024 production of Cherrywood at the Meisner Studio", caption:"Cherrywood"},
  {link: "/lighting/little_women", imageLink: littleWomenImage, 
    title:"2024 production of Little Women at the Meisner Studio", caption:"Little Women"},
  {link: "/lighting/passage", imageLink: passageImage, 
        title:"2024 production of Passage at the Meisner Studio", caption:"Passage"},
  {link: "/lighting/after_life", imageLink: afterlifeImage, 
    title:"2024 production of After Life at the Meisner Studio", caption:"After Life"},
  {link: "/lighting/bats", imageLink: batsImage, 
    title:"Concert showcase of student artists at the Clive Davis Institute", caption:"Body and the Stage"},
  {link: "/lighting/no_guts_no_glory", imageLink: noGutsImage, 
    title:"Fall 2023 Halloween cabaret with Tisch New Theatre", caption:"No Guts, No Glory"},
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
