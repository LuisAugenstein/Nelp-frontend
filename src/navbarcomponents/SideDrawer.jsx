import React from "react";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  return (
    <nav className="sidedrawer" id="sidedrawer">
      <ul>
        <li>
          <Link to="/map">Karte</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
        <li>
          <Link to="/profil">Profil</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
