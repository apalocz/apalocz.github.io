import { useState } from "react";
import { NavLink } from "react-router-dom";

import header_img from "../images/nav_icons/AP-header.png"

import gd_icon from "../images/nav_icons/gd-icon.png"
import ld_icon from "../images/nav_icons/ld-icon.png"
import cs_icon from "../images/nav_icons/cs-icon.png"
// import writing_icon from "../images/nav_icons/writing-icon.png"
// import music_icon from "../images/nav_icons/music-icon.png"
import animation_icon from "../images/nav_icons/animation-icon.png"
// import other_icon from "../images/nav_icons/other-icon.png"



import './pageFrameComponents.css';

const navInfoList = [
  {icon: gd_icon, name: "Graphic Design", link: "/graphic_design"},
  {icon: ld_icon, name: "Lighting Design", link: "/lighting_design"},
  {icon: cs_icon, name: "Computer Science", link: "/computer_science"},
  // {icon: writing_icon, name: "Writing", link: "/echoes_in_glass"},
  // {icon: music_icon, name: "Music", link: "/"},
  {icon: animation_icon, name: "Animation", link: "/animation"},
  // {icon: other_icon, name: "Other Projects", link: "/"}
]


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
        <p>©Copyright 2020 by Alexandra Palocz. All rights reserved.</p>
    </footer>
    );
  }
  
