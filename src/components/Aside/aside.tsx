import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './aside.scss';

const Aside = (): JSX.Element => (
  <aside className="aside">
    <Navbar.Brand href="/board" className="aside__title">Name Trello board</Navbar.Brand>
    <hr />
    <Navbar.Toggle aria-controls="basic-navbar-nav" className="aside__toggle" />
    <Nav className="me-auto aside__nav">
      <Nav.Link href="/boards" className="aside__boards">Boards</Nav.Link>
      <Nav.Link href="#" className="aside__users">Users</Nav.Link>
      <NavDropdown title="Settings" id="basic-nav-dropdown" className="aside__settings">
        <NavDropdown.Item href="#" className="aside__theme">Themes</NavDropdown.Item>
        <NavDropdown.Item href="#" className="aside__lang">
          Language
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#" className="aside__some">Something</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </aside>
);

export { Aside };
