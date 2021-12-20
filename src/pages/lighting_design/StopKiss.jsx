
import { OutsideLink } from "../../components/commonComponents";

import stopkiss1 from "../../images/stop_kiss_show_photos/stopkiss-1.jpg";
import stopkiss2 from "../../images/stop_kiss_show_photos/stopkiss-2.jpg";
import stopkiss3 from "../../images/stop_kiss_show_photos/stopkiss-3.jpg";
import stopkiss4 from "../../images/stop_kiss_show_photos/stopkiss-4.jpg";
import stopkiss5 from "../../images/stop_kiss_show_photos/stopkiss-5.jpg";
import stopkissIn from "../../images/stop_kiss_show_photos/stopkiss-in.jpg";


const alt_text = "< A photograph from Theatre Intime's 2018 production of Stop Kiss >";
const showImageList = [stopkissIn, stopkiss1, stopkiss2, stopkiss3, stopkiss4, stopkiss5];

function StopKiss() {
  return (
    <>
    <h2>Stop Kiss</h2>
            
    <ul> 
        <li> by Diana Son</li>
        <li> Directed by Regina Zeng </li>
        <li> Lighting Design by Alexandra Palocz and Richard Feig </li>
        <li> Set/Costume Design by Wendy Ho</li>
        <li> Sound Design by <OutsideLink link="https://www.abbyspare.com/"> Abby Spare </OutsideLink> </li>
        <li> Photography by <OutsideLink link="https://www.theatreintime.org/" > Theatre Intime </OutsideLink></li>
    </ul>

    {showImageList.map(source => <img src={source} alt={alt_text} key={source}/>)}
    </>
  );
}

export default StopKiss;
