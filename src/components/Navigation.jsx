import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Navigation() {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <h1>Hylkysukellusilmoituspalvelu</h1>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/hylyt">
            <Nav.Link>Sukellusilmoitus</Nav.Link>
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
