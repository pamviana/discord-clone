import React, { useState } from "react";
import "./chat-container.styles.css";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM4ODMyOSwiZXhwIjoxOTU4OTY0MzI5fQ.ZiPWl2LlIwA48mTiRGMu8viVgKPaPSIY5ochYZubRz0";
const SUPABASE_URL = "https://bjmsxdvqjuskengvjwut.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function ChatContainer() {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);

  React.useEffect(() => {
    supabaseClient
      .from("messages")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        console.log("List", data);
        setMessagesList(data);
      });
  }, []);

  function handleNewMessage(newMessage) {
    const message = {
      author: "pamviana",
      message_value: newMessage,
    };

    supabaseClient
      .from("messages")
      .insert([message])
      .then(({ data }) => {
        console.log({ data });
        setMessagesList([ data[0], ...messagesList ]);
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
          return (
            <li key={currMessage.id}>
              {currMessage.author} - {currMessage.message_value}
            </li>
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
          placeholder="Message @pamviana"
        ></input>
      </div>
    </>
  );
}

export default ChatContainer;
