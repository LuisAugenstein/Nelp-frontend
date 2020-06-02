import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const LoginBox = ({ socket, setUser, history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const submitLogin = () => {
    socket.emit("getUser", { username }, user => {
      if (!user) user = { username: "", password: "" };
      if (user.username !== username) {
        setUsernameError("This user doesn't exist");
        return;
      }
      if (user.password !== password) {
        setPasswordError("wrong password");
        return;
      }
      setUser(user);
      document.cookie = JSON.stringify(user.id);
      history.push("/map");
    });
  };

  return (
    <div className="inner-container">
      <div className="header">NELP</div>
      <div className="box">
        <div className="input-group">
          <label htmlFor="username">Benutzername</label>
          <input
            type="text"
            name="username"
            className="login-input"
            placeholder="Username"
            onChange={e => {
              setUsername(e.target.value);
              setUsernameError("");
            }}
            onKeyDown={e => (e.key === "Enter" ? submitLogin() : null)}
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
              setPasswordError("");
            }}
            onKeyDown={e => (e.key === "Enter" ? submitLogin() : null)}
          />
          <small className="danger-error">{passwordError}</small>
        </div>

        <button className="login-btn" type="submit" onClick={submitLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default withRouter(LoginBox);
