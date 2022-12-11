import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavDropdown } from "react-bootstrap";

function Nav() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Link to="/" className="nav-item">
        <Navbar.Brand>Games</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <ul className="navbar-nav">
          <NavDropdown title="Mazes" id="mazes-dropdown">
            <NavDropdown.Item as={Link} to="/maze/DFS">
              DFS
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/maze/BFS">
              BFS
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Games" id="games-dropdown">
            <NavDropdown.Item as={Link} to="/game/tictactoe">
              Tic Tac Toe
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/game/connectfour">
              Connect Four
            </NavDropdown.Item>
          </NavDropdown>
        </ul>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Nav;
