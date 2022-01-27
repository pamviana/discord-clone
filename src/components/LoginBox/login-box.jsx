import React, { useState, useEffect } from "react";
import "./login-box.styles.css";

function LoginBox() {
  const [userPicture, setUserPicture] = useState(`https://cdn-icons-png.flaticon.com/512/149/149071.png`);
  
  return (
    <div className="centralize-boxes">
      <div className="main-box-home">
      {/*-----------------PROFILE PICTURE---------------*/}
        <div className="img-profile-home">
          <img
            id="img-profile"
            alt="profile_image"
            src={userPicture}
          />
        </div>

        <div className="form-container-home">
          <h1 id="title-home-login-box"> Welcome back!</h1>
          <p id="subtitle-home-login-box"> We're so excited to see you again!</p>
          <div className="input-button-container">

            <input id="input-username-home" type="text"
              onChange={(event) => {     
                let username= event.target.value;         
                if(username.length > 2) {
                  setUserPicture(`https://github.com/${username}.png`)
                }
              }}

              onSubmit={(event) => {
                event.preventDefault();
              }}
            ></input>

            <button id="button-enter-home">Enter</button>
          </div>          
        </div>
      </div>
    </div>
  );
}

export default LoginBox;
