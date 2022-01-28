import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatPage from "./components/ChatPage/chat-page";
import LoginBox from "./components/LoginBox/login-box";

function App() {
  return (
    <div className="main-home">
      <Routes>
        <Route path="/" element={<LoginBox />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
