import { OutsideLink } from "../../commonComponents";

import legally1_small from "../../../images/legally_blonde_show_photos/legally-1-small.jpg";
import legally2_small from "../../../images/legally_blonde_show_photos/legally-2-small.jpg";
import legally3_small from "../../../images/legally_blonde_show_photos/legally-3-small.jpg";
import legally4_small from "../../../images/legally_blonde_show_photos/legally-4-small.jpg";
import legally5_small from "../../../images/legally_blonde_show_photos/legally-5-small.jpg";
import legally6_small from "../../../images/legally_blonde_show_photos/legally-6-small.jpg";
import legally7_small from "../../../images/legally_blonde_show_photos/legally-7-small.jpg";
import legally8_small from "../../../images/legally_blonde_show_photos/legally-8-small.jpg";
import legallyIn_small from "../../../images/legally_blonde_show_photos/legally-in-small.jpg";

import legally1 from "../../../images/legally_blonde_show_photos/legally-1.jpg";
import legally2 from "../../../images/legally_blonde_show_photos/legally-2.jpg";
import legally3 from "../../../images/legally_blonde_show_photos/legally-3.jpg";
import legally4 from "../../../images/legally_blonde_show_photos/legally-4.jpg";
import legally5 from "../../../images/legally_blonde_show_photos/legally-5.jpg";
import legally6 from "../../../images/legally_blonde_show_photos/legally-6.jpg";
import legally7 from "../../../images/legally_blonde_show_photos/legally-7.jpg";
import legally8 from "../../../images/legally_blonde_show_photos/legally-8.jpg";
import legallyIn from "../../../images/legally_blonde_show_photos/legally-in.jpg";

import { LargeImage } from "../../commonComponents";


const alt_text = "< A photograph from the Princeton Program in Theater's 2018 production of Legally Blonde >";
const showImageList = [
  {small: legally1_small, large: legally1}, {small: legally2_small, large: legally2}, {small: legally3_small, large: legally3}, 
  {small: legally4_small, large: legally4}, {small: legally5_small, large: legally5}, {small: legally6_small, large: legally6}, 
  {small: legallyIn_small, large: legallyIn}, {small: legally7_small, large: legally7}, {small: legally8_small, large: legally8}];

function LegallyBlonde() {
  return (
    <>
    <h2> Legally Blonde</h2>
            
    <ul> 
        <li> Music and Lyrics by Laurence O’Keefe and Nell Benjamin, book by Heather Hach </li>
        <li> Directed by Tamia Goodman </li>
        <li> Lighting Design by Alexandra Palocz </li>
        <li> Set Design by <OutsideLink link="https://motendesigns.com/"> Lawrence Moten </OutsideLink> </li>
        <li> Costume Design by <OutsideLink link="https://www.saritafellows.com/"> Sarita Fellows </OutsideLink>  </li>
        <li> Sound Design by Matthew Fischer </li>
        <li> Photography by <OutsideLink link="http://larrylevanti.com/index.html"> Larry Levanti </OutsideLink> / 
            {" "}Lewis Center for the Arts © 2018 The Trustees of Princeton University </li>
    </ul>

    {showImageList.map(imgInfo => (<LargeImage smallSource={imgInfo.small} largeSource={imgInfo.large} 
      altText={alt_text} key={imgInfo.small}/>))}

    </>
  );
}

export default LegallyBlonde;