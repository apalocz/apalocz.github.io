import legally1 from "../../images/legally_blonde_show_photos/legally-1.jpg";
import legally2 from "../../images/legally_blonde_show_photos/legally-2.jpg";
import legally3 from "../../images/legally_blonde_show_photos/legally-3.jpg";
import legally4 from "../../images/legally_blonde_show_photos/legally-4.jpg";
import legally5 from "../../images/legally_blonde_show_photos/legally-5.jpg";
import legally6 from "../../images/legally_blonde_show_photos/legally-6.jpg";
import legally7 from "../../images/legally_blonde_show_photos/legally-7.jpg";
import legally8 from "../../images/legally_blonde_show_photos/legally-8.jpg";
import legallyIn from "../../images/legally_blonde_show_photos/legally-in.jpg";


const alt_text = "< A photograph from the Princeton Program in Theater's 2018 production of Legally Blonde >";
const showImageList = [legally1, legally2, legally3, legally4, legally5, legally6, legallyIn, legally7, legally8];

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
