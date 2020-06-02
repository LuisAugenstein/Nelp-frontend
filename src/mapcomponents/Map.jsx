import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Map.scss";
import Navigator from "../navbarcomponents/Navigator";
import MainMap from "./MainMap";

const Map = ({ socket, user, setCurrentMessagePartner, history, ENDPOINT }) => {
  const [profiles, setProfiles] = useState([]);
  const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    if (user.location.lat !== 0) {
      setLocation(user.location);
      return;
    } else {
      setLocation({ lat: null, lng: null });
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation({ lat: coords.latitude, lng: coords.longitude });
      },
      ({ error }) => {
        setLocation({ lat: 0, lng: 0 });
      }
    );
  }, [user.location]);

  useEffect(() => {
    socket.emit("getOtherProfiles", { id: user.id }, profiles => {
      setProfiles(profiles);
    });
  }, [user]);

  const profileClicked = profile => {
    socket.emit("addMessagePartner", { sender: user.id, receiver: profile.id });
    setCurrentMessagePartner({
      id: profile.id,
      username: profile.username,
      imageURL: profile.imageURL
    });
    history.push("/chat");
  };

  return (
    <div>
      <Navigator />
      <div className="main-map-container">
        {location.lat !== null ? (
          <MainMap
            location={location}
            profiles={profiles}
            ENDPOINT={ENDPOINT}
            profileClicked={profileClicked}
            containerElement={<div style={{ height: "100%", width: "100%" }} />}
            mapElement={<div style={{ height: "100%", width: "100%" }} />}
            loadingElement={<div style={{ height: "100%", width: "100%" }} />}
            googleMapURL={
              "https://maps.googleapis.com/maps/api/js?key=AIzaSyDZrITuWC0UklAXRcpxlXWR8p46MeuTbZk"
            }
          />
        ) : null}
      </div>
    </div>
  );
};

export default withRouter(Map);
