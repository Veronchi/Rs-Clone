import React, { MouseEvent, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './aside.scss';
import { TaskEdit } from '../TaskEdit/TaskEdit';

const Aside = (): JSX.Element => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const handleModalClose = (): void => setIsModal(false);

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
    <aside className="aside">
      <button className="aside__close" aria-label="Hide" type="button" onClick={handleAside} />
      <div className="aside__container">
        <div className="aside__title">
          <p className="aside__avatar">U</p>
          <div>
            <p className="aside__name">User</p>
            <p className="aside__email">sdg@fjk.com</p>
          </div>
        </div>
        <hr />
        <Nav className="me-auto aside__nav">
          <Link to="/boards" className="aside__boards">Boards</Link>
          <Link to="/auth" className="aside__users">Users</Link>
          <NavDropdown title="Settings" id="basic-nav-dropdown" className="aside__settings">
            <NavDropdown.Item href="#" className="aside__theme">Themes</NavDropdown.Item>
            <NavDropdown.Item href="#" className="aside__lang">
              Language
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#" className="aside__some">Something</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <button type="button" onClick={():void => setIsModal(true)}>
          Card
        </button>
      </div>
      {isModal ? <TaskEdit show={isModal} handleModal={handleModalClose} /> : null}
    </aside>
  );
};
export { Aside };
