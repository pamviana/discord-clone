import React, { useState } from "react";
import "./chat-container.styles.css";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM4ODMyOSwiZXhwIjoxOTU4OTY0MzI5fQ.ZiPWl2LlIwA48mTiRGMu8viVgKPaPSIY5ochYZubRz0";
const SUPABASE_URL = "https://bjmsxdvqjuskengvjwut.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function ChatContainer(props) {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);

  React.useEffect(() => {
    supabaseClient
      .from("messages")
      .select("*")
      .order("id", { ascending: true })
      .then(({ data }) => {
        console.log("List", data);
        setMessagesList(data);
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
        console.log({ data });
        setMessagesList([...messagesList, data[0]]);
      });
    setMessage("");
  }

  return (
    <>
      <div className="header-chat-container">
        <p id="p-header-chat"> Chat </p>
        <p id="p-header-chat"> Logout</p>
      </div>

      <div className="messages-container">
        {messagesList.map((currMessage) => {
          const date= new Date().toLocaleDateString()
          return (
            <>
              <li id="message-sent" key={currMessage.id}>
                
                <div className="who-is-speaking-profile">
                <img
                  id="img-friend-profile"
                  alt="profile_image"
                  src={`https://github.com/${currMessage.author}.png`}
                />
                  <p id="username-message-sent">{currMessage.author}</p>
                  <p id="date-message-sent">{date}</p>
                </div>
                {currMessage.message_value}
              </li>              
            </>
          );
        })}
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
          placeholder={`Message @${props.loggedInUser}`}
        ></input>
      </div>
    </>
  );
}

export default ChatContainer;
