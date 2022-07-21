import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "moment/locale/ko.js";

const Home = () => {
  const [id, setId] = useState();
  const [state, setState] = useState();
  const [topping, setTopping] = useState("파, 계란");
  //const [test, setTest] = useState();

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://devluna.alphacircle.co.kr:5000");

    socketRef.current.emit("order", [{ soup: "100", topping }]);
    //서버에서 msg 로 연결되면 메시지 보내줌
    socketRef.current.on("getId", (msg) => {
      setId(msg.id);
      setTopping(msg.topping);
      setState(msg.state);
    });

    socketRef.current.on("getState", (msg) => {
      console.log(msg);
      setId(msg.id);
      setTopping(msg.topping);
      setState(msg.state);
    });

    // socketRef.current.on("hello", (msg) => {
    //   setTest(msg);
    // });
  }, []);

  return (
    <>
      <p>
        {id}번 손님 조리 상태 : {topping}
      </p>
      <img src={state} alt="" />
    </>
  );
};

export default Home;
