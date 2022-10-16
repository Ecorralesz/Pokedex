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
        <div 
        className="pokeball-smaller"
        style={{
          bottom: "50px",
          right: "150px"
        }}
        >
          <div className="pokeball">
            <div 
            className="pokeball__button" 
            style={{fontFamily: "Arcade", fontSize: "10px", color: "black"}}
            ></div>
          </div>
          </div>
      <div className="name-container">
        <h1 className="tracking-in-expand">POKEDEX</h1>
        <h2 className="tracking-in-expand">Hello Trainer!</h2>
        <p className="tracking-in-expand">Give me your name to start</p>
        <div className="input-container">
          <input
            placeholder="Type your name here!"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="shadow-pop-tr"
          />
          <button onClick={dispatchUsername} className="shadow-pop-tr">
            Send <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </button>
        </div>
        <div className="lines-cont">
          <div className="first-line"></div>
          <div className="second-line"></div>
        </div>
      
      </div>
    </div>
  );
};

export default UserInput;
