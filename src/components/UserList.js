import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import api from "../api";
import Card from "./Card/Card";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatPage from "./chatPage/ChatPage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import profilePic from "../images/civilised.jpg";
import classes from "./UserList.module.css";

const socket = io(process.env.REACT_APP_BACKEND_URL, { autoConnect: false });

const UserList = () => {
  const [userList, setUserList] = useState();
  const [isloading, setIsLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatData, setChatData] = useState({});
  const jwt = useSelector((state) => state.user.token);
  console.log(jwt);
  const user = JSON.parse(localStorage.getItem("userData"));
  const chatDataHandler = (data) => {
    setChatOpen(false);
    setChatData(data);
    setChatOpen(true);
  };

  const chatCloseHandler = () => {
    setChatData({});
    setChatOpen(false);
  };

  useEffect(() => {
    console.log(user);
    socket.auth = { id: user._id };
    socket.connect();
    const getUserList = async () => {
      try {
        const response = await api.get("/user/getAllUser", {
          headers: { authorization: `Bearer ${jwt}` },
        });
        let data = response.data;
        console.log(data);
        data = data.filter((userData) => {
          return userData._id !== user._id;
        });
        setUserList(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getUserList();
    // socket.on("connect", () => {
    //   console.log("connected");
    // });

    socket.on("notify", (data) => {
      console.log(data);
      console.log(chatOpen);
      if (chatOpen === false) {
        toast(`${data.senderName} sent:- ${data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
    socket.on("get-all-user", (data) => {
      console.log(data);
      setOnlineUsers(data);
    });
    return () => {
      socket.off("get-all-user");
      socket.off("notify");
      console.log("userList cleanUp");
    };
  }, [chatOpen]);

  const userDataMap = (userList) => {
    return userList.map((user) => {
      return (
        <Card
          key={user._id}
          userName={user.userName}
          id={user._id}
          onlineUsers={onlineUsers}
          chatDataHandler={chatDataHandler}
        ></Card>
      );
    });
  };

  return (
    <>
      {isloading ? (
        <div>loading</div>
      ) : (
        <>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {}
          <ToastContainer />
          <Container fluid>
            <Row>
              <Col>
                <div className={classes.profile}>
                  <img src={profilePic} alt="profile pifc" />
                  {user.userName} (You)
                </div>
                {userDataMap(userList)}
              </Col>
              <Col lg={9}>
                {chatOpen && (
                  <ChatPage
                    chatData={chatData}
                    chatCloseHandler={chatCloseHandler}
                    socket={socket}
                  />
                )}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default UserList;
