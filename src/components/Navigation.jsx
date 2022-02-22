import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Navigation() {
  return (
    <Navbar bg="white" expand="lg" sticky="top" className="py-3">
      <Navbar.Brand href="/" as="h1">Hylkysukellusilmoituspalvelu</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <LinkContainer to="/etusivu">
            <Nav.Link>Etusivu</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/hylyt">
            <Nav.Link>Hylyt</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/uusi">
            <Nav.Link>Uusi hylky</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
