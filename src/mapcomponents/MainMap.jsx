import React, { useState } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MainMap = ({ location, profiles, profileClicked, ENDPOINT }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <GoogleMap
      defaultCenter={location.lat === 0 ? { lat: 50, lng: 8 } : location}
      defaultZoom={location.lat === 0 ? 7 : 15}
    >
      {location.lat && (
        <Marker
          position={location}
          icon={{
            url:
              "https://d1s6fstvea5cci.cloudfront.net/content/themes/vtnz/resources/assets/images/pulse_dot.gif",
            scaledSize: new window.google.maps.Size(32, 32)
          }}
        />
      )}
      {profiles.map(profile => {
        return (
          <Marker
            key={"profile-" + profile.id}
            position={profile.location}
            onClick={() => {
              setSelectedProfile(null);
              setSelectedProfile(profile);
            }}
          />
        );
      })}
      {selectedProfile && (
        <InfoWindow
          position={selectedProfile.location}
          onCloseClick={() => setSelectedProfile(null)}
        >
          <div className="profile-card">
            <div className="profile-card-header">
              <h1>{selectedProfile.username}</h1>
              <div className="profile-card-image-container">
                <img
                  className={selectedProfile.imageURL ? "loaded-image" : ""}
                  src={ENDPOINT + selectedProfile.imageURL}
                  alt="Profil"
                />
              </div>
            </div>
            <label htmlFor="profil-description">Beschreibung:</label>
            <p id="profil-description">{selectedProfile.description}</p>
            <button
              className="profile-card-btn"
              onClick={() => profileClicked(selectedProfile)}
            >
              Kontaktieren
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(MainMap));
