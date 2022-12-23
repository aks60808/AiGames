import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NAVDOM() {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
      <Container>
        <Link to="AiGames/" className="nav-item">
          <Navbar.Brand>Games</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="AiGames/maze/">
              Maze Search
            </Nav.Link>
            <NavDropdown title="Games" id="games-dropdown">
              <NavDropdown.Item as={Link} to="AiGames/game/tictactoe">
                Tic Tac Toe
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="AiGames/game/connectfour">
                Connect Four
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NAVDOM;
