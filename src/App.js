import { useEffect, useState } from "react";
import Form from "./components/Form";
import io from "socket.io-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import { useSelector, useDispatch } from "react-redux";
import {
  isLoggedOut,
  gotUserData,
  isLogin as setLoginTrue,
} from "./redux/action";
import api from "./api";
import UserList from "./components/UserList";
import ChatPage from "./components/chatPage/ChatPage";

function App() {
  const isLogin = useSelector((state) => state.login);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

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
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <div>Loading</div>
              ) : isLogin ? (
                <div>
                  <h1>Chat With User</h1>
                  <div style={{ textAlign: "center" }}>
                    <UserList></UserList>
                  </div>
                </div>
              ) : (
                <LoginPage></LoginPage>
              )
            }
          />
          <Route
            name="chatPage"
            path="/chat/:recieverId"
            element={<ChatPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
