import { useState, useEffect } from "react";
import { NavLink, useLocation} from "react-router-dom";

import header_img from "../images/nav_icons/AP-header.png"

import gd_icon from "../images/nav_icons/gd-icon.png"
import ld_icon from "../images/nav_icons/ld-icon.png"
import cs_icon from "../images/nav_icons/cs-icon.png"
import writing_icon from "../images/nav_icons/writing-icon.png"
import music_icon from "../images/nav_icons/music-icon.png"
import animation_icon from "../images/nav_icons/animation-icon.png"
import other_icon from "../images/nav_icons/other-icon.png"

import './pageFrameComponents.css';

const navInfoList = [
  {icon: gd_icon, name: "Graphic Design", link: "/graphic_design"},
  {icon: cs_icon, name: "Computer Science", link: "/computer_science"},
  {icon: writing_icon, name: "Writing", link: "/writing"},
  {icon: music_icon, name: "Music", link: "/music"},
  {icon: ld_icon, name: "Lighting Design", link: "/lighting_design"},
  {icon: animation_icon, name: "Animation", link: "/animation"},
  {icon: other_icon, name: "Other Projects", link: "/other_projects"}
]

// wrapper so that the page scrolls to the top when a new path is loaded
export function TopScrollWrapper(props) {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return props.children
}

export function NavElement (props) {
  const [showName, setShowName] = useState(false)
  const {icon, name, link} = props.navInfo
  return (
    <div className="nav_element_container" 
      onMouseEnter={() => setShowName(true)}
      onMouseLeave={() => setShowName(false)}
      >
       <NavLink to={link} >
       <div className="nav_element">
          <img src={icon} alt={name}/>
        </div>
        {showName && (
          <div className="nav_name_container"> <div className="nav_name"> {name} </div> </div>
        )
        }
        </NavLink>
    </div>
  )
}

export function Header() {
  return (
    <header> 
       <NavLink to="/"  className="home_link">
            <img src={header_img} alt=""/>
            <div className="site_title">Alexandra Palocz</div>
        </NavLink>
        <div className="sidebar">
        {navInfoList.map(navInfo => (<NavElement key={navInfo.name} navInfo={navInfo}/>))}
        </div>
    </header>
  );
}


export function Footer() {
    return (
        <footer>
        <p>©Copyright 2021 by Alexandra Palocz. All rights reserved.</p>
    </footer>
    );
  }
  

