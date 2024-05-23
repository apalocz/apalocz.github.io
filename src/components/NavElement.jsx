import { useState, useEffect } from "react";
// import { Image } from '@astrojs/image/components';

import header_img from "../images/nav_icons/AP-header.png";
import './pageFrameComponents.css';

// cutoff to use mobile layout rules
const MOBILE_WIDTH_CUTOFF = 1000;

export function NavElement (props) {
  const [showName, setShowName] = useState(false)
  const {icon, name, link} = props.navInfo

  const navElementMain =  (
      <>
        <div className="nav_element">
        <img src={icon.src} alt={name}/>
        </div>
        {showName && (
          <div className="nav_name_container"> <div className="nav_name"> {name} </div> </div>
        )
        }
      </>
    )
  return (
    <div className="nav_element_container" 
      onMouseEnter={() => setShowName(true)}
      onMouseLeave={() => setShowName(false)}
      >
        {/* only wrap in a link if the name is showing; otherwise, have a click/tap show the name */}
        {showName ?
          <a href={link}>
              {navElementMain}
          </a>
        : navElementMain
        }
   
    </div>
  )
}






// takes a navInfoList of navigation pieces
export function HeaderFrame (props) {
  const [showNav, setShowNav] = useState(true)
  const {navInfoList} = props

  // check to see if this is a mobile width
  const [isMobile, setIsMobile] = useState(false)
  
  

  // the part of the header on top
  const topHeader = (
    <>
      <img src={header_img.src} alt="" width={60} height={60}/>
      <div className="site_title">Alexandra Palocz</div>
    </>
  )


  const hideNavOnMobile = () => {
    // if it's mobile, hide nav on mouse leave
    if(isMobile) {
      setShowNav(false)
    }
  }

  const navInfo = (navInfoList.map(navInfo => (
    <NavElement key={navInfo.name} navInfo={navInfo}/>
    )
  ));

  // set isMobile based on window side
  // should only be called when loaded on client, since window is client-only
  const updateIsMobile = () => {
    setIsMobile(window.matchMedia(`(max-device-width: ${MOBILE_WIDTH_CUTOFF}px)`).matches);
  }

  // set isMobile once loaded on client
  useEffect(() => {
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
  }, []);

  // hide nav once isMobile is set
  useEffect(() => {
    hideNavOnMobile()
  }, [isMobile]);


  return (
      <header> 
        <div         
          onMouseEnter={() => setShowNav(true)}
          onMouseLeave={() => {console.log("mouse leave header"); hideNavOnMobile()}}
        >
        {/* Only wrap in link if showing nav; otherwise, let click/enter show nav */}
        {showNav ?
            <a href="/"  className="home_link"
              onClick={hideNavOnMobile}>
                {topHeader}
            </a>
          :
          <div className="home_link">
            {topHeader}
          </div>
        }

        {showNav &&
          <div className="sidebar">
            {navInfo}
          </div>
        }
        </div>
    </header>
  )
}

  

