import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeName } from "../store/slices/userName.slice";

const UserInput = () => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");

  const dispatchUsername = () => {
    dispatch(changeName(userName));
    navigate("/pokedex");
  };

  const navigate = useNavigate();

  return (
    <div className="main-page-cont">
        <div class="pokeball">
          <div class="pokeball__button"></div>
        </div>
      <div className="name-container">
        <h1>POKEDEX</h1>
        <h2>Hello Trainer!</h2>
        <p>Give me your name to start</p>
        <div className="input-container">
          <input
            placeholder="Type your name here!"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={dispatchUsername}>
            Send <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </button>
        </div>
        <div className="lines-cont">
          <div className="first-line"></div>
          <div className="second-line"></div>
        </div>
        <div className="wrapper">
          <div className="pokeball-spinner"></div>
        </div>
      </div>
    </div>
  );
};

export default UserInput;
