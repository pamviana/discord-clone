import React from "react";
import "./chat-page.styles.css";
import ChatContainer from "./ChatContainer/chat-container";
import ContactSidebar from "./ContactSidebar/contact-sidebar";

function ChatPage() {
  return (
    <div className="centralize-boxes">
      <div className="chat-contacts-container">
        <ContactSidebar />
      </div>
      <div className="chat-container">
        <ChatContainer />
      </div>      
    </div>
  );
}

export default ChatPage;
