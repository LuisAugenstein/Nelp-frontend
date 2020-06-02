import React, { useEffect } from "react";
import "./Profil.scss";
import Navigator from "../navbarcomponents/Navigator";
import NameCard from "./NameCard";
import DescriptionCard from "./DescriptionCard";
import LocationCard from "./LocationCard";
import { useState } from "react";

const Profil = ({ socket, user, setUser, ENDPOINT }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!image || !user || (!user.id && user.id !== 0)) return;
    socket.emit("updateImage", { id: user.id, image }, imageURL => {
      const { id, username, password, location, description } = user;
      setUser({
        id,
        username,
        password,
        imageURL,
        location,
        description
      });
    });
  }, [image]);

  useEffect(() => {
    if (!user || (!user.id && user.id !== 0)) return;
    socket.emit("updateUser", user);
  }, [user]);

  return (
    <div>
      <Navigator />
      <main className="profil-body">
        <div className="cards">
          <NameCard
            user={user}
            setUser={setUser}
            setImage={setImage}
            ENDPOINT={ENDPOINT}
          />
          <DescriptionCard user={user} setUser={setUser} />
          <LocationCard user={user} setUser={setUser} />
        </div>
      </main>
    </div>
  );
};

export default Profil;
