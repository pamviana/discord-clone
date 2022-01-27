import React from "react";
import "./input-container.styles.css";

function InputContainer(props) {
  return (
    <div className="input-message-container">
      <input
        id="type-message-input"
        type="text"
        placeholder={props.placeholder}
      ></input>
    </div>
  );
}

export default InputContainer;
