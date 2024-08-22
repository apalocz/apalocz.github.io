import { useState, useEffect } from "react";
// import { Image } from '@astrojs/image/components';

import header_img from "../images/nav_icons/AP-header.png";
import './pageFrameComponents.css';

// cutoff to use mobile layout rules
const MOBILE_WIDTH_CUTOFF = 400;

export function NavElement (props) {
  const [showName, setShowName] = useState(false)
  const {icon, name, link} = props.navInfo

  const onClick = () => {
    // if showName is false, show it
    if(!showName) setShowName(true);
    // if already showing the name, move to link
    else {
      window.location.href = link;
    }
  }
  return (
    <div className="nav_element_container" 
      onMouseEnter={() => setShowName(true)}
      onMouseLeave={() => setShowName(false)}
      onClick={onClick}
    >
        <div className="nav_element"
          >
          <img src={icon.src} alt={name}/>
        </div>
        {showName && (
          <div className="nav_name_container"> <div className="nav_name"> {name} </div> </div>
        )
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
  const topIcon = (
    <img src={header_img.src} alt="" width={60} height={60} onClick={() => setShowNav(true)}/>
  )


  const hideNavOnMobile = () => {
    // if it's mobile, hide nav on mouse leave
    if(isMobile && showNav) {
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
    setIsMobile(window.matchMedia(`(max-width: ${MOBILE_WIDTH_CUTOFF}px)`).matches);
  }

  // set isMobile once loaded on client
  useEffect(() => {
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
  }, []);

  // show/hide nav once isMobile is set
  useEffect(() => {
    setShowNav(!isMobile)
  }, [isMobile]);


  return (
      <header> 
        <div         
          onMouseEnter={() => setShowNav(true)}
          onMouseLeave={() => {hideNavOnMobile()}}
        >
        
        <div className="home_link" onClick={hideNavOnMobile}>
          {/* Only wrap icon in link if showing nav; otherwise, let click/tap show nav */}
          {showNav ?
            <a href="/">{topIcon}</a> : topIcon
          }
          <a href="/" className="site_title">Alexandra Palocz</a>
        
        </div>
        

        {showNav &&
          <div className="sidebar">
            {navInfo}
          </div>
        }
        </div>
    </header>
  )
}

  

