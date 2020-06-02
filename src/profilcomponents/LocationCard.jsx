import React, { useState, useEffect } from "react";
import SmallMap from "./SmallMap";

const LocationCard = ({ user, setUser }) => {
  const [buttonName, setButtonName] = useState("Standort freigeben");

  useEffect(() => {
    setButtonName(
      user.location.lat ? "Standort verbergen" : "Standort freigeben"
    );
  }, [user.location]);

  const changeLocation = () => {
    const { id, username, password, imageURL, description } = user;
    let location = { lat: 0, lng: 0 };
    if (!user.location.lat) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        location = { lat: coords.latitude, lng: coords.longitude };
        setUser({ id, username, password, imageURL, description, location });
      });
    } else {
      setUser({ id, username, password, imageURL, description, location });
    }
  };

  return (
    <div className="card" id="location-card">
      <h1>Standort</h1>
      <p>
        geben sie ihren Standort frei, sodass andere Nutzer ihren Standort sehen
        und wir ihren Nachbarn ihre Anfrage anzeigen können.
      </p>
      <div className="location-map">
        {user.location.lat ? (
          <SmallMap
            location={user.location}
            containerElement={<div className="location-map" />}
            mapElement={<div className="location-map" />}
            loadingElement={<div className="location-map" />}
            googleMapURL={
              "https://maps.googleapis.com/maps/api/js?key=AIzaSyDZrITuWC0UklAXRcpxlXWR8p46MeuTbZk"
            }
          />
        ) : (
          <h2>Standort nicht freigegeben</h2>
        )}
      </div>

      <div className="location-card-footer">
        <button className="location-btn" onClick={changeLocation}>
          {buttonName}
        </button>
        <div className="coords">
          <p id="coords">aktueller Standort: </p>
          <label htmlFor="coords">{`latitude:  ${
            user.location.lat === null ? 0 : user.location.lat.toFixed(3)
          }`}</label>
          <label htmlFor="coords">{`longitude: ${
            user.location.lat === null ? 0 : user.location.lng.toFixed(3)
          }`}</label>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
