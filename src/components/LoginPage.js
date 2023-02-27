import React, { useState } from "react";
import api from "../api";
import { useDispatch } from "react-redux";
import { gotUserData, isLogin as setLoginTrue } from "../redux/action";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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
    console.log("signUp handler run");
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
    <div style={{ width: "40%", margin: "5% auto" }}>
      {isLogin ? (
        <>
          <Form onSubmit={loginHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="userName"
                value={userName}
                onChange={changeHandler}
                type="text"
                placeholder="Enter Username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                value={password}
                onChange={changeHandler}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <h4>{erroMessage}</h4>
          </Form>
          <Button
            variant="outline-primary"
            onClick={() => {
              setIslogin(false);
              setUserName("");
              setPassword("");
              setConfirmPassword("");
              setErrorMessage("");
            }}
          >
            Register
          </Button>
        </>
      ) : (
        <>
          <Form onSubmit={signUpHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="userName"
                value={userName}
                onChange={changeHandler}
                type="text"
                placeholder="Enter Username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                value={password}
                onChange={changeHandler}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={changeHandler}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
            <h4>{erroMessage}</h4>
          </Form>
          <Button
            variant="outline-primary"
            onClick={() => {
              setIslogin(true);
              setUserName("");
              setPassword("");
              setConfirmPassword("");
              setErrorMessage("");
            }}
          >
            Login into existing
          </Button>
        </>
      )}
    </div>
  );
};

export default LoginPage;
