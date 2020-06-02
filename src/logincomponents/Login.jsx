import React, { useState } from "react";
import "./Login.scss";
import LoginBox from "./LoginBox";
import RegisterBox from "./RegisterBox";

const Login = ({ socket, setUser }) => {
  const [LoginOpen, setLoginOpen] = useState(true);
  const [RegisterOpen, setRegisterOpen] = useState(false);

  const switchOpen = (login, register) => {
    setLoginOpen(login);
    setRegisterOpen(register);
  };

  return (
    <div className="root-container">
      <div className="background-image"></div>
      <div className="box-controller">
        <div
          className={"controller " + (LoginOpen ? "selected-controller" : "")}
          onClick={() => switchOpen(true, false)}
        >
          Login
        </div>
        <div
          className={
            "controller " + (RegisterOpen ? "selected-controller" : "")
          }
          onClick={() => switchOpen(false, true)}
        >
          Registrieren
        </div>
      </div>
      <div className="box-container">
        {LoginOpen && <LoginBox socket={socket} setUser={setUser} />}
        {RegisterOpen && <RegisterBox socket={socket} />}
      </div>
    </div>
  );
};

export default Login;
