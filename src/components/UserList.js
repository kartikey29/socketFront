import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import api from "../api";
import Card from "./Card/Card";
const UserList = () => {
  const [userList, setUserList] = useState();
  const [isloading, setIsLoading] = useState(true);

  const jwt = useSelector((state) => state.user.token);
  console.log(jwt);
  useEffect(() => {
    const getUserList = async () => {
      try {
        const response = await api.get("/user/getAllUser", {
          headers: { authorization: `Bearer ${jwt}` },
        });
        const data = response.data;
        console.log(data);
        setUserList(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getUserList();
  }, []);

  const userDataMap = (userList) => {
    return userList.map((user) => {
      return (
        <Card key={user._id} userName={user.userName} id={user._id}></Card>
      );
    });
  };

  return <>{isloading ? <div>loading</div> : <>{userDataMap(userList)}</>}</>;
};

export default UserList;
