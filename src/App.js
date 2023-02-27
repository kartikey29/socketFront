import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import { useSelector, useDispatch } from "react-redux";
import {
  isLoggedOut,
  gotUserData,
  removeUser,
  isLogin as setLoginTrue,
} from "./redux/action";
import api from "./api";
import UserList from "./components/UserList";
import "./App.css";

function App() {
  const isLogin = useSelector((state) => state.login);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(isLoggedOut());
    dispatch(removeUser());
    localStorage.removeItem("userData");
    window.location.reload(true);
  };

  useEffect(() => {
    let getUserData = localStorage.getItem("userData");
    getUserData = JSON.parse(getUserData);
    if (getUserData == null) {
      dispatch(isLoggedOut());
      setIsLoading(false);
    } else {
      const userData = async () => {
        try {
          let userData = await api.get("/user/", {
            headers: { authorization: `Bearer ${getUserData.token}` },
          });
          userData = { ...userData.data.data, token: userData.data.token };
          localStorage.setItem("userData", JSON.stringify(userData));
          dispatch(gotUserData(userData));
          dispatch(setLoginTrue());
          setIsLoading(false);
        } catch (e) {
          console.log(e);
          localStorage.removeItem("userItem");
          dispatch(isLoggedOut());
          setIsLoading(false);
        }
      };

      userData();
    }
  }, []);

  return (
    <div className="App">
      <div className="navBar">
        <h1>ChatApp</h1>{" "}
        {isLogin && <button onClick={logoutHandler}>Logout</button>}
      </div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <div>Loading</div>
              ) : isLogin ? (
                <div>
                  <div style={{ textAlign: "center" }}>
                    <UserList></UserList>
                  </div>
                </div>
              ) : (
                <LoginPage></LoginPage>
              )
            }
          />
          {/* <Route
            name="chatPage"
            path="/chat/:recieverId"
            element={<ChatPage />}
          /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
