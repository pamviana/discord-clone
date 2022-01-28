
import React, { useState } from "react";
import "./login-box.styles.css";
import {useNavigate} from 'react-router-dom';


function LoginBox(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [userPicture, setUserPicture] = useState(
    `https://cdn-icons-png.flaticon.com/512/149/149071.png`
  );

  const goToChat = () => navigate({
    pathname: '/chat',
    search: `?username=${username}`
  })

  

  return (
    <div className="centralize-boxes">
      <div className="main-box-home">
        {/*-----------------PROFILE PICTURE---------------*/}
        <div className="img-profile-home">
          <img id="img-profile" alt="profile_image" src={userPicture} />
        </div>

        <div className="form-container-home">
          <h1 id="title-home-login-box"> Welcome back!</h1>
          <p id="subtitle-home-login-box">
            {" "}
            We're so excited to see you again!
          </p>
          <div className="input-button-container">
            <input
              id="input-username-home"
              type="text"
              onChange={(event) => {
                let currUsername = event.target.value;
                setUsername(currUsername);                
                if (username.length > 2) {
                  setUserPicture(`https://github.com/${currUsername}.png`);
                }
              }}
            ></input>

            <button
              id="button-enter-home"
              onClick= {goToChat}
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginBox;
