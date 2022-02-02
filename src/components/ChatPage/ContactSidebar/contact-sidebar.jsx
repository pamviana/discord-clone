import React, { useState, useEffect, Fragment } from "react";
import { MdDelete } from "react-icons/md";
import "./contact-sidebar.styles.css";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM4ODMyOSwiZXhwIjoxOTU4OTY0MzI5fQ.ZiPWl2LlIwA48mTiRGMu8viVgKPaPSIY5ochYZubRz0";
const SUPABASE_URL = "https://bjmsxdvqjuskengvjwut.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


/* ------------------------Main function------------------------ */

function ContactSidebar(props) {
  const [addFriendUsername, setAddFriendUsername] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [searchFriend, setSearchFriend] = useState("");
  const [addFriend, setAddFriend] = useState(false);
  const showAddFriend = () => {
    setAddFriend(!addFriend);
  };

  /* ------------ Pulling data from database ------------- */

  useEffect(() => {
    supabaseClient
      .from("friends")
      .select("*")
      .eq("username", props.loggedInUser)
      .order("id", { ascending: true })
      .then(({ data }) => {
        console.log("List", data);
        setFriendList(data);
      });
  }, []);

  /* ------------- Pushing data to database -------------- */

  function handleNewFriend(newFriend) {
    const friend = {
      username: props.loggedInUser,
      friend: newFriend,
    };
    supabaseClient
      .from("friends")
      .insert([friend])
      .then(({ data }) => {
        console.log({ data });
        setFriendList([...friendList, data[0]]);
      });
    setAddFriendUsername("");
  }

  function handleDeleteFriend(currFriend) {
     supabaseClient
      .from("friends")
      .delete()
      .match({friend : currFriend, username: props.loggedInUser})
      .then(({ data }) => {
        console.log({ data });
        var newFriends = friendList.filter((friend) => friend.friend !== currFriend)
        setFriendList(newFriends);
      });
  }

  /* ------------------------Main function return------------------------ */
  return (
    <Fragment>
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
            <input
              id="input-enter-username"
              placeholder="Enter a username"
              value={addFriendUsername}
              type="text"
              onChange={(event) => {
                setAddFriendUsername(event.target.value);
                console.log(addFriendUsername);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNewFriend(addFriendUsername);
                }
              }}
            ></input>
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
        <input
          value={searchFriend}
          onChange={(event) => {
            setSearchFriend(event.target.value);
          }}
          id="input-search-friend"
          placeholder="Find a friend"
        />

        <div className="contact-list-container">
          <ul className="contact-list">
            {friendList
              .filter((val) => {
                if (searchFriend === "") {
                  return val;
                } else if (
                  val.friend.toLowerCase().includes(searchFriend.toLowerCase())
                ) {
                  return val;
                } else {
                  return "";
                }
              })
              .map((currFriend) => {
                return (
                  <FriendListContainer
                    key={currFriend.id}
                    friendUsername={currFriend.friend}
                    onDeleteClick = {handleDeleteFriend}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

function FriendListContainer(props) {
  const friendUsername = props.friendUsername;
  return (
    <li className="friend-container">
      <div className="friend-frame">
        <img
          id="img-friend-profile"
          alt="profile_image"
          src={`https://github.com/${friendUsername}.png`}
        />
        <p id="friend-name-title">{friendUsername}</p>
      </div>
      <div className="icons-friend-container">
        <p
          name={friendUsername}
          id="delete-icon"
          color="#ffffff2d"
          onClick={(event) => {
            const friendName = event.target.getAttribute('name')
            props.onDeleteClick(friendName)
          }}
        >x</p>
      </div>
    </li>
  );
}

export default ContactSidebar;
