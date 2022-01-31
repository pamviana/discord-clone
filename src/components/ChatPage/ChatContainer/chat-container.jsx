import React, { useState } from "react";
import "./chat-container.styles.css";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import ReactScrollableFeed from "react-scrollable-feed";
import ButtonStickers from "../../ButtonStickers/ButtonStickers";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM4ODMyOSwiZXhwIjoxOTU4OTY0MzI5fQ.ZiPWl2LlIwA48mTiRGMu8viVgKPaPSIY5ochYZubRz0";
const SUPABASE_URL = "https://bjmsxdvqjuskengvjwut.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function listenMessageInRealTime(addMessage) {
  return supabaseClient
    .from("messages")
    .on("INSERT", (liveResponse) => {
      addMessage(liveResponse.new);
    })
    .subscribe();
}


function ChatContainer(props) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);

  const goToHome = () =>
    navigate({
      pathname: "/",
    });

    console.log(props.loggedInUser)

  React.useEffect(() => {
    supabaseClient
      .from("messages")
      .select("*")
      .order("id", { ascending: true })
      .then(({ data }) => {
        setMessagesList(data);
      });

    listenMessageInRealTime((newMessage) => {
      console.log("New Message:", newMessage);
      setMessagesList((currList) => {
        return [...currList, newMessage];
      });
    });
  }, []);

  function handleNewMessage(newMessage) {
    const message = {
      author: props.loggedInUser,
      message_value: newMessage,
    };

    supabaseClient
      .from("messages")
      .insert([message])
      .then(({ data }) => {
        console.log("Test: ", data);
      });
    setMessage("");
  }

  function handleDeleteFriend(messageId) {
    supabaseClient
      .from("messages")
      .delete()
      .match({ id: messageId })
      .then(({ data }) => {
        console.log({ data });
        var newMessages = messagesList.filter(
          (message) => message.id !== messageId
        );
        setMessagesList(newMessages);
      });
  }
  

  return (
    <>
      <div className="header-chat-container">
        <p className="p-header-chat"> Chat </p>
        <p onClick={goToHome} id="logout-title" className="p-header-chat">
          {" "}
          Logout
        </p>
      </div>
      <div className="messages-container">
        <ReactScrollableFeed className="scroll-section" forceScroll={true}>
          {messagesList.map((currMessage) => {
            const date = new Date().toLocaleDateString();
            return (
              <li id="message-sent" key={currMessage.id}>
                <div className="who-is-speaking-profile">
                  <div className="username-date-chat">
                    <img
                      id="img-friend-profile"
                      src={`https://github.com/${currMessage.author}.png`}                      
                      alt="profile_image"                      
                    />
                    <p id="username-message-sent">{currMessage.author}</p>
                    <p id="date-message-sent">{date}</p>
                  </div>
                  <div className="icons-chat">
                    <p id="delete-icon-chat"
                    onClick={(event) => {
                      event.preventDefault()
                      handleDeleteFriend(currMessage.id)
                    }}> x </p>
                  </div>
                </div>
                {currMessage.message_value.startsWith(":sticker:") ? (
                  <img
                    id="sticker-sent"
                    alt="sticker"
                    src={currMessage.message_value.replace(":sticker:", "")}
                  />
                ) : (
                  currMessage.message_value
                )}
              </li>
            );
          })}
        </ReactScrollableFeed>
      </div>
      <div className="input-message-container">
        <input
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleNewMessage(message);
            }
          }}
          id="type-message-input"
          type="text"
          placeholder='Type a message'
        ></input>
        <ButtonStickers/>
      </div>
    </>
  );
}

export default ChatContainer;
