import { useState } from "react";
// import { Image } from '@astrojs/image/components';
import './pageFrameComponents.css';


export function NavElement (props) {
  const [showName, setShowName] = useState(false)
  const {icon, name, link} = props.navInfo
  return (
    <div className="nav_element_container" 
      onMouseEnter={() => setShowName(true)}
      onMouseLeave={() => setShowName(false)}
      >
       <a href={link} >
       <div className="nav_element">
          <img src={icon.src} alt={name}/>
        </div>
        {showName && (
          <div className="nav_name_container"> <div className="nav_name"> {name} </div> </div>
        )
        }
        </a>
    </div>
  )
}

  

