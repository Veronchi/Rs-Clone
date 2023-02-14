import React, { MouseEvent } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CloseButton from 'react-bootstrap/CloseButton';
import './aside.scss';

const Aside = (): JSX.Element => {
  const handleAside = (e: MouseEvent<HTMLButtonElement>): void => {
    const container = document.querySelector('.aside__container') as HTMLElement;
    const aside = e.currentTarget.parentElement;
    const button = e.currentTarget;
    if (aside) {
      if (aside.classList.contains('closed')) {
        container.style.display = 'block';
        aside.classList.remove('closed');
        button.classList.remove('arrow-right');
      } else {
        aside.classList.add('closed');
        container.style.display = 'none';
        button.classList.add('arrow-right');
      }
    }
  };

  return (
    <aside className="aside closed">
      <CloseButton className="aside__close" aria-label="Hide" onClick={handleAside} />
      <div className="aside__container">
        <Navbar.Brand href="/board" className="aside__title">Name Trello board</Navbar.Brand>
        <hr />
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
      </div>
    </aside>
  );
};
export { Aside };
