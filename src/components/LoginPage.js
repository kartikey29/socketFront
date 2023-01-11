import React, { useState } from "react";
import api from "../api";
import { useDispatch } from "react-redux";
import { gotUserData, isLogin as setLoginTrue } from "../redux/action";

const LoginPage = () => {
  const [isLogin, setIslogin] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [erroMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setErrorMessage("");
    switch (name) {
      case "userName":
        setUserName(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      let body = {
        userName,
        password,
      };
      const response = await api.post("/user/login", body);
      const { data } = response;
      const userData = { ...data.data, token: data.token };
      localStorage.setItem("userData", JSON.stringify(userData));
      dispatch(gotUserData(userData));
      dispatch(setLoginTrue());
    } catch (e) {
      console.log(e.response.data.error.message);
      setErrorMessage(e.response.data.error.message);
    }
  };
  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      if (confirmPassword === password) {
        const body = {
          userName,
          password,
        };
        const response = await api.post("/user/signUp", body);
        const { data } = response;
        const userData = { ...data.data, token: data.token };
        localStorage.setItem("userData", JSON.stringify(userData));
        dispatch(gotUserData(userData));
        dispatch(setLoginTrue());
      } else {
        setErrorMessage("confirmed password doesnt match password");
      }
    } catch (e) {
      setErrorMessage(e.response.data.error.message);
    }
  };

  return (
    <div>
      {isLogin ? (
        <>
          <form onSubmit={loginHandler}>
            <input
              name="userName"
              placeholder="Enter Username"
              value={userName}
              onChange={changeHandler}
            ></input>
            <input
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={changeHandler}
            ></input>
            <button type="submit">Login</button>
            <br></br>
            <button
              onClick={() => {
                setIslogin(false);
                setUserName("");
                setPassword("");
                setErrorMessage("");
              }}
            >
              Create Account
            </button>
            <h4>{erroMessage}</h4>
          </form>
        </>
      ) : (
        <>
          <form onSubmit={signUpHandler}>
            <input
              name="userName"
              placeholder="Enter Username"
              value={userName}
              onChange={changeHandler}
            ></input>
            <input
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={changeHandler}
            ></input>
            <input
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={changeHandler}
            ></input>
            <button type="submit">SignUp</button>
            <br></br>
            <button
              onClick={() => {
                setIslogin(true);
                setUserName("");
                setPassword("");
                setConfirmPassword("");
                setErrorMessage("");
              }}
            >
              Login into existing Account
            </button>
            <h4>{erroMessage}</h4>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginPage;
