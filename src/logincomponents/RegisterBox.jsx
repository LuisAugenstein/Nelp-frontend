import React, { useState, useEffect } from "react";

const RegisterBox = ({ socket }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameTakenError, setUsernameTakenError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registeredMsg, setRegisteredMsg] = useState("");

  useEffect(() => {
    if (username === "") return;
    socket.emit("checkUser", { username }, ({ res }) => {
      setUsernameTakenError(res);
    });
  }, [username]);

  const submitRegister = () => {
    let usernameError, passwordError;
    setUsernameError(
      (usernameError = username === "" ? "Username cannot be empty" : "")
    );
    setPasswordError(
      (passwordError = password === "" ? "Password cannot be empty" : "")
    );
    if (
      usernameError === "" &&
      passwordError === "" &&
      usernameTakenError === ""
    ) {
      setRegisteredMsg("Registrierung erfolgreich");
      socket.emit("addUser", { username, password });
      setUsername("");
      setPassword("");
    } else {
      setRegisteredMsg("");
    }
  };

  return (
    <div className="inner-container">
      <div className="header">NELP</div>
      <div className="box">
        <div className="input-group">
          <small className="danger-error">{usernameTakenError}</small>
          <label htmlFor="username">Benutzername</label>
          <input
            type="text"
            name="username"
            className="login-input"
            placeholder="Username"
            onChange={e => {
              setUsername(e.target.value);
              setRegisteredMsg("");
            }}
            onKeyDown={e => (e.key === "Enter" ? submitRegister() : null)}
            value={username}
          />
          <small className="danger-error">{usernameError}</small>
        </div>

        <div className="input-group">
          <label htmlFor="password">Passwort</label>
          <input
            type="password"
            name="password"
            className="login-input pwd"
            placeholder="Password"
            onChange={e => {
              setPassword(e.target.value);
              setRegisteredMsg("");
            }}
            onKeyDown={e => (e.key === "Enter" ? submitRegister() : null)}
            value={password}
          />
          <small className="danger-error">{passwordError}</small>
        </div>

        <small className="registered-msg">{registeredMsg}</small>

        <button type="button" className="login-btn" onClick={submitRegister}>
          Registrieren
        </button>
      </div>
    </div>
  );
};

export default RegisterBox;
