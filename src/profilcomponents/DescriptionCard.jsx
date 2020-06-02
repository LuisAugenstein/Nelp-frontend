import React from "react";

const DescriptionCard = ({ user, setUser }) => {
  return (
    <div className="card" id="description-card">
      <h1>Beschreibung</h1>
      <p>
        hier können sie ihre angebotenen Tätigkeiten angeben. Andere Nutzer
        sehen diese.
      </p>
      <textarea
        id="description"
        cols="30"
        rows="10"
        value={user.description}
        onChange={e => {
          const { id, username, password, imageURL, location } = user;
          setUser({
            id,
            username,
            password,
            imageURL,
            location,
            description: e.target.value
          });
        }}
      ></textarea>
    </div>
  );
};

export default DescriptionCard;
