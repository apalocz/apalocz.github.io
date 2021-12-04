import { useState } from "react";

import arrow from "../../images/arrow-icon.png";
import diyfest from "../../images/animations/DIYfest.gif";
import pheonix from  "../../images/animations/pheonix.gif";
import light from  "../../images/animations/light.gif";
import "./AnimationPage.css";

const AnimationItemNames = ["Inkbleed", "DIY Festival 2019", "Wisp-light", "Pheonix"]

const inkbleed_description = ( <>
  <li> Conception, animation, music, set/prop construction, editing, and some sound effects by Alexandra Palocz </li>
  <li> Further credit for sound effects goes to users sethroph, suburbanwizard, mtjohnson, cbakos, and inspectorj 
      on freesound.org. </li>
  <li> Thanks are due to Tim Szetela for his advice and insight, to Orlando Murgado for his sculpture shop 
      guidance, and to Princeton’s VIS department for granting access to the space and materials 
      needed to bring this project to life. </li> </>
)

const diy_fest_description = "Animation created for the Princeton Program in Theater's 2019 DIY festival";


function AnimationItem(props) {
  const {currentDisplayIndex, name, description, children} = props
  console.log(AnimationItemNames[currentDisplayIndex], name )
  if (AnimationItemNames[currentDisplayIndex] !== name) return null;
  return (
    <>
    <div className="centered">
      <h3> {name} </h3>
      {children}
    </div>
    <ul/>
    {description}

    </>
  )
}



function AnimationPage() {
  const [currentDisplayIndex, setCurrentDisplayIndex] = useState(0);

  const upIndex = () => {setCurrentDisplayIndex((currentDisplayIndex + 1) % AnimationItemNames.length)}
  const downIndex = () => {setCurrentDisplayIndex( (AnimationItemNames.length + currentDisplayIndex - 1) % AnimationItemNames.length)}
  
  return (
    <>
      <h2> Animation </h2>
      <div className ="anim-gallery-wrapper">
     <img src={arrow} alt='<==' className = "anim-gallery-button" onClick= {downIndex} />
      <div className="anim-gallery-content">
      <AnimationItem name="Inkbleed" description={inkbleed_description} currentDisplayIndex={currentDisplayIndex}>
      <div style={{height: 400}}>
            <iframe title="inkbleed-vimeo" className="fill-container" src="https://player.vimeo.com/video/311442311?loop=1" width="100%" height="100%" 
                frameBorder="0" allow="autoplay; fullscreen" allowFullScreen> </iframe>
        </div>
        <p> <i> When her pen leaks into a library book, a young girl is whisked away to a world of paper, 
            ink, and monsters. </i> </p>
      </AnimationItem>

      <AnimationItem name="DIY Festival 2019" description={diy_fest_description} currentDisplayIndex={currentDisplayIndex}>
        <img alt="DIY festival animated graphic" src={diyfest}/>
      </AnimationItem>

      <AnimationItem name="Wisp-light" description="" currentDisplayIndex={currentDisplayIndex}>
        <img alt="Animation of a figure walking in darkness, with a light" src={light}/>
      </AnimationItem>

      <AnimationItem name="Pheonix" description="" currentDisplayIndex={currentDisplayIndex}>
        <img alt="Animation of a pheonix emerging from the ashes" src={pheonix}/>
      </AnimationItem>

    </div>
  
     <img src={arrow} alt='<==' className = "anim-gallery-button flip-horizontally" onClick= {upIndex}/> 
    </div>
    </>
  );
}

export default AnimationPage;


// {height: "min(calc(100vw * 360/640), calc(100vh - 5.7rem));"}