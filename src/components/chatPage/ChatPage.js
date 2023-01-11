import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../api";
import io from "socket.io-client";
const socket = io("http://localhost:5000", { autoConnect: false });

const ChatPage = () => {
  const [isloading, setIsLoading] = useState(true);
  const [senderData, setSenderData] = useState();
  const user = JSON.parse(localStorage.getItem("userData"));
  const [recieverData, setRecieverData] = useState();
  const { recieverId } = useParams();
  console.log(recieverId);
  useEffect(() => {
    const getData = async () => {
      try {
        setSenderData(user);
        const data = await api.get(`/user/${recieverId}`, {
          headers: { authorization: `Bearer ${user.token}` },
        });
        setRecieverData(data.data.user);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    socket.auth = { id: user._id };
    socket.connect();
    getData();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = { reciverId: recieverId, message: "hello" };
    socket.emit("hello", data);
  };

  return (
    <div>
      {isloading ? (
        <>loading</>
      ) : (
        <>
          <div>Chating with {recieverData.userName}</div>
          <div>
            <div> Chat Box</div>
            <form onSubmit={submitHandler}>
              <input type="text"></input>
              <button type="submit">Submit</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatPage;
