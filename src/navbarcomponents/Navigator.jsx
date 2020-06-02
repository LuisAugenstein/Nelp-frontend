import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigator.scss";
import SideDrawer from "./SideDrawer";

const Navigator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <header className="navbar">
        <nav className="navbar-navigation">
          <div className="logo-button">
            <div>
              <button
                className="toggle-button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <div className="toggle-button-line" />
                <div className="toggle-button-line" />
                <div className="toggle-button-line" />
              </button>
            </div>
            <div className="navbar-logo">
              <Link to="/map">NELP</Link>
            </div>
          </div>
          <div className="navbar-navigation-items">
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
          </div>
          <div className="logout">
            <Link to="/">Logout</Link>
          </div>
        </nav>
      </header>
      {sidebarOpen && <SideDrawer />}
    </div>
  );
};

export default Navigator;
