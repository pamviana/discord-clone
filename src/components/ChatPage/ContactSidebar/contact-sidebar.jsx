import React from "react";
import InputContainer from "../InputContainer/input-container";
import "./contact-sidebar.styles.css";

function ContactSidebar() {
  return (
    <>         
      <InputContainer placeholder="Find a conversation"/>
      <h3 id="chat-contacts-title"> Contacts </h3>   
      
    </>
  );
}

export default ContactSidebar;
