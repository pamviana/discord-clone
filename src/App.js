import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatPage from "./components/ChatPage/chat-page";
import Header from "./components/Header/header";
import LoginBox from "./components/LoginBox/login-box";

function App() {
  return (
    <div className="main-home">
      <header className="header-main">
        <div className="icons-header">
          <Header />
        </div>
      </header>

      <Routes>
        <Route path="/" element={<LoginBox />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
