import React from "react";
import InputContainer from "../InputContainer/input-container";
import "./contact-sidebar.styles.css";

function ContactSidebar() {
  return (
    <>
      <div className="contact-search-input-container">
        <InputContainer placeholder="Find a conversation" />
      </div>
      <div className="contact-sidebar-container">
        <h3 id="chat-contacts-title"> Friends </h3>

        <div className="contact-list-container">
          <ul className="contact-list">
            <li> bbviana</li>
            <li> pamviana</li>
            <li> joshwinblad</li>
            <li> mariajose</li>
          </ul>
          <button>+</button>
        </div>
      </div>
    </>
  );
}

export default ContactSidebar;
