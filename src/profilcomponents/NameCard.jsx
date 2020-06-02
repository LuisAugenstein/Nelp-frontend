import React from "react";

const NameCard = ({ user, setUser, setImage, ENDPOINT }) => {
  const onImageChange = e => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  return (
    <div className="card">
      <div className="names">
        <h1>Profil</h1>
        <label htmlFor="username">Nutzername:</label>
        <input
          type="text"
          className="text-input"
          value={user.username}
          onChange={e => {
            const { id, password, imageURL, location, description } = user;
            setUser({
              id,
              username: e.target.value,
              password,
              imageURL,
              location,
              description
            });
          }}
          id="username"
        />
        <label htmlFor="password">Passwort:</label>
        <input
          type="text"
          className="text-input"
          value={user.password}
          onChange={e => {
            const { id, username, imageURL, location, description } = user;
            setUser({
              id,
              username,
              password: e.target.value,
              imageURL,
              location,
              description
            });
          }}
          id="password"
        />
      </div>
      <div className="image">
        <div className="image-preview">
          <img
            src={ENDPOINT + user.imageURL}
            alt="Lade ein Bild hoch"
            className={user.imageURL ? "image-preview-image-loaded" : ""}
            id="profil-image"
          />
        </div>
        <label htmlFor="image-input" className="image-input-label">
          Bearbeiten
        </label>
        <input
          className="image-input"
          id="image-input"
          type="file"
          accept="image/*"
          onChange={onImageChange}
        />
      </div>
    </div>
  );
};

export default NameCard;
