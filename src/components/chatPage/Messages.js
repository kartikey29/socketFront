import React, { useEffect, useState, useRef } from "react";
import classes from "./Message.module.css";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const Messages = (props) => {
  let { userId } = props;
  const container = useRef(null);

  const user = JSON.parse(localStorage.getItem("userData"));
  const [chatData, setChatData] = useState(props.chatData);
  const socket = props.socket;
  const Scroll = () => {
    if (container && container.current) {
      const element = container.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    setChatData(props.chatData);
    console.log("rerender");
    socket.on("messageRecieved", (data) => {
      if (
        data.senderId === props.recieverId ||
        data.recieverId === props.recieverId
      ) {
        setChatData((prev) => {
          return [...prev, data];
        });
        Scroll();
      } else {
        console.log("notification");
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
    Scroll();
    return () => {
      socket.off("messageRecieved");
    };
  }, [props.chatData]);

  const mapMessage = (chatData) => {
    return chatData.map((message) => {
      if (message.senderId === userId) {
        return (
          <div key={message._id} className={classes.sent}>
            <div>
              {message.message}
              <p className={classes.time}>
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <div key={message._id} className={classes.recieved}>
            <div>
              {message.message}
              <p className={classes.timeRecieved}>
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className={classes.messageBox} ref={container}>
      {mapMessage(chatData)}
      {/* <div ref={dummy} /> */}
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
    </div>
  );
};

export default Messages;
