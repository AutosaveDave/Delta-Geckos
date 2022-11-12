import * as React from "react";
import "../style/TitleNav.css";

import Auth from "../utils/auth";

const TitleNav = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="navbar">
      <a href="./" className="site-title">
        DELTA GECKOS
      </a>
      <ul>
        {Auth.loggedIn() ? (
          <>
            <li className="active">
              <a href="./">HOME</a>
            </li>
            <li className="active">
              <a href="./Profile">PROFILE</a>
            </li>
            <li className="logout active" onClick={logout}>
              LOGOUT
            </li>
          </>
        ) : (
          <>
            <li className="active">
              <a href="./">HOME</a>
            </li>
            <li>
              <a href="./LoginSignup">LOGIN</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default TitleNav;
