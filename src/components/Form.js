// import React, { useState } from "react";
// import io from "socket.io-client";
// const socket = io("http://localhost:5000");
// const Form = () => {
//   const [value, setValue] = useState();
//   const [message, setMessage] = useState("");
//   const submitHandler = (e) => {
//     e.preventDefault();
//     socket.emit("hello", { message: value });
//     setValue("");
//   };

//   socket.on("hello", (data) => {
//     setMessage(data.message);
//   });

//   const changeHandler = (e) => {
//     setValue(e.target.value);
//   };

//   return (
//     <div>
//       <h1>{message}</h1>
//       <form onSubmit={submitHandler}>
//         <input name="message" onChange={changeHandler} value={value}></input>
//         <button type="submit"></button>
//       </form>
//     </div>
//   );
// };

// export default Form;
