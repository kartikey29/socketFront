import React, { useEffect, useState } from "react";
import api from "../../api";
import Messages from "./Messages";
import classes from "./ChatPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import profilePic from "../../images/cow.jpg";

const ChatPage = (props) => {
  const [isloading, setIsLoading] = useState(true);
  const [senderData, setSenderData] = useState();
  const [text, setText] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData"));
  const [recieverData, setRecieverData] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatData, setChatData] = useState([]);
  const socket = props.socket;
  useEffect(() => {
    const recieverId = props.chatData.recieverId;
    console.log("chat page");
    const getData = async () => {
      try {
        console.log("userList chat data");
        setSenderData(user);
        const data = await api.get(`/user/${recieverId}`, {
          headers: { authorization: `Bearer ${user.token}` },
        });
        const getChatData = await api.get(`/chat/${user._id}/${recieverId}`, {
          headers: { authorization: `Bearer ${user.token}` },
        });
        setChatData(getChatData.data.data);
        setRecieverData(data.data.user);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [props.chatData]);

  const changeHandler = (e) => {
    setText(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      recieverId: recieverData._id,
      senderId: senderData._id,
      senderName: user.userName,
      message: text,
    };
    try {
      const res = await api.post(
        "/chat",
        {
          senderId: senderData._id,
          recieverId: recieverData._id,
          message: text,
        },
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      );
    } catch (e) {
      console.log(e);
    }
    console.log("submit");
    socket.emit("hello", data);
    setText("");
  };

  return (
    <div>
      {isloading ? (
        <>loading</>
      ) : (
        <>
          <div
            className={classes.profileHeader}
            style={{ position: "relative" }}
          >
            <img
              className={classes.profilePic}
              alt="profile"
              src={profilePic}
            />{" "}
            {recieverData.userName}
            <FontAwesomeIcon
              onClick={() => {
                props.chatCloseHandler();
              }}
              className={classes.closeBtn}
              icon={faCircleXmark}
            />
          </div>

          <div>
            <Messages
              userId={user._id}
              recieverId={recieverData._id}
              chatData={chatData}
              socket={socket}
            />
            <form onSubmit={submitHandler} className={classes.chatInput}>
              <input
                type="text"
                required={true}
                onChange={changeHandler}
                value={text}
              ></input>
              <button type="submit">Submit</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatPage;
