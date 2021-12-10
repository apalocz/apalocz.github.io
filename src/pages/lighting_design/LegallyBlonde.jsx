import legally1_small from "../../images/legally_blonde_show_photos/legally-1-small.jpg";
import legally2_small from "../../images/legally_blonde_show_photos/legally-2-small.jpg";
import legally3_small from "../../images/legally_blonde_show_photos/legally-3-small.jpg";
import legally4_small from "../../images/legally_blonde_show_photos/legally-4-small.jpg";
import legally5_small from "../../images/legally_blonde_show_photos/legally-5-small.jpg";
import legally6_small from "../../images/legally_blonde_show_photos/legally-6-small.jpg";
import legally7_small from "../../images/legally_blonde_show_photos/legally-7-small.jpg";
import legally8_small from "../../images/legally_blonde_show_photos/legally-8-small.jpg";
import legallyIn_small from "../../images/legally_blonde_show_photos/legally-in-small.jpg";


const alt_text = "< A photograph from the Princeton Program in Theater's 2018 production of Legally Blonde >";
const showImageList = [legally1_small, legally2_small, legally3_small, legally4_small, 
                      legally5_small, legally6_small, legallyIn_small, legally7_small, legally8_small];

function LegallyBlonde() {
  return (
    <>
    <h2> Legally Blonde</h2>
            
    <ul> 
        <li> Music and Lyrics by Laurence O’Keefe and Nell Benjamin, book by Heather Hach </li>
        <li> Directed by Tamia Goodwin </li>
        <li> Set Design by Lawrence Moten</li>
        <li> Costume Design by Sarita Fellows </li>
        <li> Sound Design by Matthew Fischer </li>
        <li> Photography by Larry Levanti / Lewis Center for the Arts © 2018 The Trustees of Princeton University </li>
    </ul>

    {showImageList.map(source => <img src={source} alt={alt_text} key={source}/>)}

    </>
  );
}

export default LegallyBlonde;
