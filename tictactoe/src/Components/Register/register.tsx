import React, { useEffect, useState } from "react";
import { register, registerUser } from "../../Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store";
import { Navbar } from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./Register.css";
export const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const userInfo = useSelector((state: RootState) => state.user);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userInfo.token);
    console.log(username);
    console.log(password);
  }, [userInfo]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };
  const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let info: register = {
      username: username,
      password: password,
    };
    dispatch(registerUser(info));
    navigate("/");
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="register">
          <h1 className="register-header">Register</h1>
          <form className="register-form">
            <div className="input-name-register">
              <label className="username-label">Username:</label>
              <input
                placeholder="username"
                type="text"
                className="register-username"
                value={username}
                name="username"
                onChange={handleInput}
                required
              />
            </div>
            <div className="input-register-password">
              <label className="password-label">Password:</label>
              <input
                placeholder="password"
                type="password"
                className="register-password"
                value={password}
                name="password"
                onChange={handleInput}
                required
              />
            </div>
          </form>
          <button className="register-bttn" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </>
  );
};
