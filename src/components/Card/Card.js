import React, { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import classes from "./Card.module.css";
import io from "socket.io-client";

const Card = (props) => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const [online, setOnline] = useState(false);

  useEffect(() => {
    if (props.onlineUsers.some((user) => user === props.id)) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }, [props.onlineUsers]);

  const clickHandler = () => {
    props.chatDataHandler({ recieverId: props.id });
  };
  return (
    <>
      <div className={classes.holder}>
        <div>user:- {props.userName}</div>
        {/* <Link to={`/chat/${props.id}`}>Chat</Link> */}
        <button onClick={clickHandler}>Chat</button>
        {online && <div style={{ color: "green" }}>Online</div>}
      </div>
    </>
  );
};

export default Card;
