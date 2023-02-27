import React, { useEffect, useState } from "react";
import classes from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

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
      <div className={classes.holder} onClick={clickHandler}>
        <div>{props.userName}</div>
        <FontAwesomeIcon
          icon={faCircle}
          style={online ? { color: "green" } : { color: "red" }}
          className={classes.onlineStatus}
        />
      </div>
    </>
  );
};

export default Card;
