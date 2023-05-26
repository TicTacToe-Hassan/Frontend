import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { capGame, createGame } from "../../Slices/GameSlice";
import { AppDispatch, RootState } from "../../Store";
import { apiValidateLogin } from "../../Slices/UserSlice";
import "./Bestof.css";
import { Navbar } from "../Navbar/Navbar";

export const Bestof: React.FC = () => {
  const gameInfo = useSelector((state: RootState) => state.game);
  const userInfo = useSelector((state: RootState) => state.user);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (event: React.MouseEvent<HTMLSelectElement>) => {
    event.preventDefault();
    let x = parseInt(event.currentTarget.value);
    console.log("Value " + x);
    dispatch(capGame(x));
  };

  const handleBegin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(gameInfo.game.cap + " this was state");
    dispatch(apiValidateLogin(userInfo.token));
    if (userInfo.loggedIn) {
      dispatch(createGame());
      navigate("/multi");
    } else {
      navigate("/login");
    }
  };

  const handleJoin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(apiValidateLogin(userInfo.token));
    if (userInfo.loggedIn) {
      navigate("/multi");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="container1">
          <div className="select">
            <select onClick={handleSelect}>
              <option selected disabled>
                -Best of
              </option>
              <option value={1}>1</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={7}>7</option>
            </select>
          </div>
          <div className="game-btn">
            <button className="bttn" onClick={handleBegin}>
              Start Game
            </button>
            <button className="bttn" onClick={handleJoin}>
              Join Session
            </button>
          </div>
        </div>
        {/* 
        <div className="container2">
          <button className="bttn" onClick={handleJoin}>
            Join Session
          </button>
        </div> */}
      </div>
    </>
  );
};
