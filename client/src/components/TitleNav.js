import * as React from "react";
import "../style/TitleNav.css";

export default function TitleNav() {
  return (
    <nav className="navbar">
      <a href="./" className="site-title">
        DELTA GECKOS
      </a>
      <ul>
        <li className="active">
          <a href="./">HOME</a>
        </li>
        <li>
          <a href="./LoginSignup">LOGIN</a>
        </li>
      </ul>
    </nav>
  );
}
