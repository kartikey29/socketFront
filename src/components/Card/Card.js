import React from "react";
import { Link, generatePath } from "react-router-dom";
import classes from "./Card.module.css";
const Card = (props) => {
  return (
    <>
      <div className={classes.holder}>
        <div>user:- {props.userName}</div>
        <Link to={`/chat/${props.id}`}>Chat</Link>
      </div>
    </>
  );
};

export default Card;
