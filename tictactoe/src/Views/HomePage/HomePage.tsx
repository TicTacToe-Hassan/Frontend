import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../Store";
import { createBoard } from "../../Slices/BoardSlice";
import { Navbar } from "../../Components/Navbar/Navbar";
import { Board } from "../../Components/Board/Board";
import { Messenger } from "../../client/client";

import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { apiValidateLogin } from "../../Slices/UserSlice";

export const HomePage: React.FC = (boradInfo) => {
  const boardInfo = useSelector((state: RootState) => state.board);
  const userInfo = useSelector((state: RootState) => state.user);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(boardInfo);
    console.log(userInfo);
  }, [boardInfo, userInfo]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.id === "1") {
      dispatch(createBoard());
      navigate("/single");
    }

    if (event.currentTarget.id === "2") {
      dispatch(apiValidateLogin(userInfo.token));
      if (userInfo.loggedIn) {
        navigate("/best");
      } else {
        navigate("/login");
      }
    }

    if (event.currentTarget.id === "3") {
      dispatch(apiValidateLogin(userInfo.token));
      dispatch(createBoard());
      navigate("/local");
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-body" title="content">
        <div title="Board" className="btn-group">
          <button
            className="button-81-pushable"
            role="button"
            id="1"
            onClick={handleClick}
          >
            <span className="button-81-shadow"></span>
            <span className="button-81-edge"></span>
            <span className="button-81-front text">Single Player</span>
          </button>

          <button
            className="button-82-pushable"
            role="button"
            id="2"
            onClick={handleClick}
          >
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text">Multi Player</span>
          </button>

          <button
            className="button-83-pushable"
            role="button"
            id="3"
            onClick={handleClick}
          >
            <span className="button-83-shadow"></span>
            <span className="button-83-edge"></span>
            <span className="button-83-front text">Local Player</span>
          </button>
        </div>
      </div>
    </>
  );
};
