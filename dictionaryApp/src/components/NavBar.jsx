import React, {useState} from "react";
import DictionaryIcon from "../assets/images/logo.svg";
import moonIcon from "../assets/images/icon-moon.svg";
import dropDownIcon from "../assets/images/icon-arrow-down.svg";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    var r = document.querySelector(':root');
    if(props.isOn) {
      r.style.setProperty('--primary-color', 'black');
      r.style.setProperty('--secondary-color', 'white');
    } else {
      r.style.setProperty('--primary-color', 'white');
      r.style.setProperty('--secondary-color', 'black');
    }
    props.setIsOn(!props.isOn);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  
  return (
    <nav>
      <img src={DictionaryIcon} alt="DictionaryIcon" />
      <div style={{position:'relative'}}>
        <h3>{props.font}</h3>
        <img onClick={toggleOpen} src={dropDownIcon} alt="dropDownIcon" />
        {isOpen && (
          <ul style={{ listStyleType: "none",cursor:"pointer", position:"absolute", left:'12%', top:'60%' }}>
            <li onClick={() => props.setFont("serif")}>
              <span>Serif</span>
            </li>
            <li onClick={() => props.setFont("sans-seif")}>
              <span>Sans Serif</span>
            </li>
            <li onClick={() => props.setFont("monospace")}>
              <span>Mono</span>
            </li>
          </ul>
        )}
        <label className="switch">
          <input type="checkbox" checked={props.isOn} onChange={toggle} />
          <span className="slider round"></span>
        </label>
        <img src={moonIcon} alt="moon-icon" />
      </div>
    </nav>
  );
};

export default NavBar