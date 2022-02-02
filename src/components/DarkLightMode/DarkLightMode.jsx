import { RiMoonFill, RiSunFill } from "react-icons/ri";
import React from "react";

function DarkLightMode() {
  return (
    <div className="dark-light-icons">
      <RiMoonFill color="#fff" height='24px' width='24px'/>
      <RiSunFill color="#fff" />
    </div>
  );
}

export default DarkLightMode;
