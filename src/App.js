import "./App.css";
import ChatPage from "./components/ChatPage/chat-page";
import LoginBox from "./components/LoginBox/login-box";

function App() {
  return (
    <div className="main-home">
      <LoginBox />
      <ChatPage/>   
    </div>
  );
}

export default App;
