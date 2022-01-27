import React from "react";
import InputContainer from "../InputContainer/input-container";
import "./chat-container.styles.css";

function ChatContainer() {
  return (
    <>
      <div className="header-chat-container">
        <p id="p-header-chat"> Chat </p>
        <p id="p-header-chat"> Logout</p>
      </div>      
      <div className="messages-container"></div>
      <InputContainer placeholder="Message @pamviana"/>
    </>
  );
}

export default ChatContainer;
