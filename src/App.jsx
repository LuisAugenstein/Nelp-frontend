import React, { useState } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import io from "socket.io-client";

import Chat from "./chatcomponents/Chat";
import Login from "./logincomponents/Login";
import Map from "./mapcomponents/Map";
import Profil from "./profilcomponents/Profil";

const App = () => {
  //user = {id, username, password, imageURL, location, description}
  const [user, setUser] = useState({
    username: "",
    password: "",
    location: { lat: null, lng: null },
  });
  //currentMessagePartner = {id, username, imageURL}
  const [currentMessagePartner, setCurrentMessagePartner] = useState(null);
  //const ENDPOINT = "https://nelp2.herokuapp.com/";
  const ENDPOINT = "http://localhost:5000/";
  const socket = io(ENDPOINT);

  if (document.cookie && (!user || (!user.id && user.id !== 0))) {
    socket.emit("getUser", { id: JSON.parse(document.cookie) }, (user) => {
      if (!user) return;
      setUser(user);
    });
  }

  return (
    <Router>
      <Route exact path="/">
        <Login socket={socket} setUser={setUser} />
      </Route>
      <Route exact path="/map">
        {user.location.lat !== null && (
          <Map
            socket={socket}
            user={user}
            setCurrentMessagePartner={setCurrentMessagePartner}
            ENDPOINT={ENDPOINT}
          />
        )}
      </Route>
      <Route exact path="/chat">
        <Chat
          socket={socket}
          user={user}
          currentMessagePartner={currentMessagePartner}
          setCurrentMessagePartner={setCurrentMessagePartner}
        />
      </Route>
      <Route exact path="/profil">
        <Profil
          socket={socket}
          user={user}
          setUser={setUser}
          ENDPOINT={ENDPOINT}
        />
      </Route>
    </Router>
  );
};

export default App;
