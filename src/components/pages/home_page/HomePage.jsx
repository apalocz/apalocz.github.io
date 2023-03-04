import eigImage from  "../../../images/eig_show_photos/eig-1-small.jpg";
import inkbleedImage from "../../../images/link_thumbnails/inkbleed-1.jpg";
import scissorsImage from "../../../images/link_thumbnails/scissors-congruence-featured.png";
import { FigureLink, OutsideLink } from "../../commonComponents";
import './HomePage.css';


const about_text = (  <>
<p> I am a thinker and tinkerer, a dreamer and do-er, learning what it means to be a creative individual 
    in collaboration with the world. I like making things, telling stories, 
    and looking for the patterns and connections that tie us all together. </p>
    
    <p> I'm currently exploring intersections of art and technology at NYU's 
    <OutsideLink link="https://tisch.nyu.edu/itp"> Interactive Telecommunications Program </OutsideLink> </p>

 </>);

const featuredProjectsList = [
    {link: "echoes_in_glass", imageLink: eigImage,
        title:"An interactive theatrical story cycle", caption:"Echoes in Glass"},
        {link: "computer_science/scissors_congruence", imageLink: scissorsImage,
        title:"An demonstration of polygon equidecomposability", caption:"Scissors Congruence"},
    {link: "animation", imageLink: inkbleedImage,
        title:"An animation about a girl who loses her pen", caption:"Inkbleed"},
   
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
