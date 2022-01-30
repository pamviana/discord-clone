import React, { useState } from "react";
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
  const [addFriendUsername, setAddFriendUsername] = useState('');
  let contactCount = 0;
  const friendList = [
    "bbviana",
    "pamviana",
    "omariosouto",
    "mariajose",
    "joshw",
    "peas",
  ];

  const [addFriend, setAddFriend] = useState(false);
  const showAddFriend = () => {
    setAddFriend(!addFriend);
  };

  return (
    <>
      <div        
        className={
          addFriend ? "add-friend-container-active" : "add-friend-container"
        }
      >
        <div className="add-friend-title-input">
          <header className="header-add-friend">
            <p> Add a Friend </p>
            <p id="close-x-add-friend" onClick={showAddFriend}>
              x
            </p>
          </header>

          <div className="input-add-friend">
            <InputContainer placeholder='Enter a username'/>
          </div>
        </div>
      </div>
      <div className="contact-sidebar-container">
        <header className="sidebar-header">
          <img
            id="img-profile-chat"
            alt="profile_image"
            src={`https://github.com/${props.loggedInUser}.png`}
          />
          <button id="button-add-friend" onClick={showAddFriend}>
            +
          </button>
        </header>
        <InputContainer placeholder="Find a conversation" />

        <div className="contact-list-container">
          <ul className="contact-list">
            {friendList.map((currFriend) => {
              return (
                <FriendListContainer
                  key={contactCount++}
                  friendUsername={currFriend}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ContactSidebar;
