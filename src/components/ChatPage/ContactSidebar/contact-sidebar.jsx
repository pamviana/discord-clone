import React from "react";
import InputContainer from "../InputContainer/input-container";
import "./contact-sidebar.styles.css";

function FriendListContainer(props) {
  const friendUsername = props.friendUsername;  

  return (
    <li className="friend-container">
      <img
        id="img-friend-profile"
        alt="profile_image"
        src={`https://github.com/${friendUsername}.png`}
      />
      <p id="friend-name-title">{friendUsername}</p>
    </li>
  );
}

function ContactSidebar(props) {
  const friendList = [
    "bbviana",
    "pamviana",
    "omariosouto",
    "mariajose",
    "joshw",
    "peas",
  ];

  return (
    <>
      <div className="contact-sidebar-container">
        <header className="sidebar-header">
          <img
            id="img-profile-chat"
            alt="profile_image"
            src={`https://github.com/${props.loggedInUser}.png`}
          />
          <button id="button-add-friend">+</button>
        </header>
        <InputContainer placeholder="Find a conversation" />

        <div className="contact-list-container">
          <ul className="contact-list">
            {friendList.map((currFriend) => {
              return(
                <FriendListContainer friendUsername={currFriend}/>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ContactSidebar;
