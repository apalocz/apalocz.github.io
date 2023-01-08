import { OutsideLink } from "../../commonComponents";

import eurydice1 from "../../../images/eurydice_show_photos/eurydice-1.jpg";
import eurydice2 from "../../../images/eurydice_show_photos/eurydice-2.jpg";
// import eurydice3 from "../../../images/eurydice_show_photos/eurydice-3.jpg";
import eurydice4 from "../../../images/eurydice_show_photos/eurydice-4.jpg";
import eurydice5 from "../../../images/eurydice_show_photos/eurydice-5.jpg";
import eurydice6 from "../../../images/eurydice_show_photos/eurydice-6.jpg";
import eurydice7 from "../../../images/eurydice_show_photos/eurydice-7.jpg";
import eurydice8 from "../../../images/eurydice_show_photos/eurydice-8.jpg";
import eurydiceIn from "../../../images/eurydice_show_photos/eurydice-in.jpg";


const alt_text = "< A photograph from Theatre Intime's 2019 performance of Eurydice >";
const showImageList = [eurydice1, eurydice2, eurydice4, eurydice5, eurydice6, eurydice7, eurydice8, eurydiceIn];


function Eurydice() {
  return (
    <>
    <h2> Eurydice</h2>
    
    <ul> 
        <li> by <OutsideLink link="https://www.sarahruhlplaywright.com/" > Sarah Ruhl </OutsideLink></li>
        <li> Directed by Eliana Cohen-Orth </li>
        <li> Lighting Design by Alexandra Palocz </li>
        <li> Set Design by Richard Feig </li>
        <li> Costume Design by <OutsideLink link="https://collegecritic.home.blog/bio/"> Paige Allen </OutsideLink> </li>
        <li> Sound Design by Naomi Park </li>
        <li> Photography by <OutsideLink link="https://www.theatreintime.org/" > Theatre Intime </OutsideLink></li>
    </ul>

    {showImageList.map(source => <img src={source} alt={alt_text} key={source}/>)}

    </>
  );
}

export default Eurydice;
