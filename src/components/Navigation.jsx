import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

function Navigation() {
  if (useLocation().pathname.match(/admin/)) {
    return null;
  }

  const loggedIn = localStorage.getItem('auth') !== null;

  return (
    <Navbar bg="white" expand="lg" sticky="top" className="py-3" collapseOnSelect>
      <Navbar.Brand href="/">Hylkysukellusilmoituspalvelu</Navbar.Brand>
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
          <LinkContainer to="/palaute">
            <Nav.Link>Anna palautetta</Nav.Link>
          </LinkContainer>
          {loggedIn
          && (
            <>
              <LinkContainer to="/omasivu">
                <Nav.Link>Oma sivu</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/uloskirjautuminen">
                <Nav.Link>Kirjaudu Ulos</Nav.Link>
              </LinkContainer>
            </>
          )}
          {!loggedIn
          && (
            <LinkContainer to="/kirjaudu">
              <Nav.Link>Kirjaudu</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
