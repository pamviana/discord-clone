import React, { useState } from "react";
import "./chat-container.styles.css";
import { createClient } from '@supabase/supabase-js'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM4ODMyOSwiZXhwIjoxOTU4OTY0MzI5fQ.ZiPWl2LlIwA48mTiRGMu8viVgKPaPSIY5ochYZubRz0'
const SUPABASE_URL='https://bjmsxdvqjuskengvjwut.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function ChatContainer(props) {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  let messageCount = 0;

  function handleNewMessage(newMessage) {
    
    const message = {
      id: 'message',
      messageValue: newMessage,
      author: 'pamviana', //props.username
      date: DateComponent(),

    }
    setMessagesList([...messagesList, message]);
    setMessage("");
  }

  function DateComponent() {
    const todayDate = new Date(),
    date= todayDate.getFullYear() + '/' + (todayDate.getMonth()+1) + '/' + todayDate.getDay()

    return date;
     
  }

  return (
    <>
      <div className="header-chat-container">
        <p id="p-header-chat"> Chat </p>
        <p id="p-header-chat"> Logout</p>
      </div>

      <div className="messages-container"> {/*should change it to ul*/}
        {messagesList.map((currMessage) => {
          return <li key={currMessage.id + messageCount++}>
          {currMessage.author} {currMessage.date} : {currMessage.messageValue}</li>;
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
