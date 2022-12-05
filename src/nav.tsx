import React from "react";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <div>
      {" "}
      <nav>
        <h1 className="navTitle">Games</h1>
        <ul className="nav-links">
          <Link style={{ color: "#BBB193" }} to="/game/tictactoe">
            <li>Tic Tac Toe</li>
          </Link>
          <Link style={{ color: "#BBB193" }} to="/game/connectfour">
            <li>Connect Four</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
