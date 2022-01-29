import React from "react";
import "./chat-page.styles.css";
import ChatContainer from "./ChatContainer/chat-container";
import ContactSidebar from "./ContactSidebar/contact-sidebar";
import { useSearchParams } from 'react-router-dom';

function ChatPage() {
  const [searchParams] = useSearchParams();
  const loggedInUser = searchParams.get('username');

  return (
    <div className="centralize-boxes">
      <div className="chat-contacts-container">
        <ContactSidebar loggedInUser= {loggedInUser}/>
      </div>
      <div className="chat-container">
        <ChatContainer loggedInUser= {loggedInUser}/>
      </div>      
    </div>
  );
}

export default ChatPage;
