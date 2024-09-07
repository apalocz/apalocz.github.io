import eigImage from  "../../../images/eig_show_photos/eig-1.jpg";
import provenanceImage from "/src/images/link_thumbnails/provenance-homepage-in.jpg"; //"/src/images/provenance_documentation/glowing_hole.jpg";
import soundGardenImage from "/src/images/link_thumbnails/sound_garden_homepage_in.jpg"; 
import { FigureLink, OutsideLink } from "../../commonComponents";
import './HomePage.css';


const about_text = (  <>
<p> I am a thinker and tinkerer, a dreamer and do-er, learning what it means to be a creative individual 
    in collaboration with the world. I like making things, telling stories, 
    and looking for the patterns and connections that tie us all together. </p>
    
    <p> I recently graduated from NYU's
    <OutsideLink link="https://itp.nyu.edu/itp/"> Interactive Telecommunications Program </OutsideLink>
    , where I spent two years exploring intersections of art and technology.
    </p>

 </>);

const featuredProjectsList = [
  {link: "echoes_in_glass", imageLink: eigImage,
    title:"An interactive theatrical story cycle", caption:"Echoes in Glass"},

    {link: "projects/provenance", imageLink: provenanceImage,
        title:"An accessible collaborative music interactive", caption:"Provenance"},
    {link: "projects/sound_garden_playground", imageLink: soundGardenImage,
        title:"An accessible collaborative music interactive", caption:"Sound Garden Playground"},
  
  ]

function HomePage() {
  return (
      <>
        <h2> About </h2>
        {about_text}

        <hr/>
        <h2> Featured Projects </h2>

        <div className="centered">
        <div className="projects flexrow">
            {featuredProjectsList.map(linkInfo => 
                (<FigureLink key={linkInfo.link} figureClassName="featured-link" linkInfo={linkInfo}/>))}
        </div>
        </div>

      </>
  );
}

export default HomePage;
