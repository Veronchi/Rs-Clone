import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IState } from '../../interfaces';
import './style.scss';

const Aside = (): JSX.Element => {
  const user = useSelector((state: IState) => state.user);
  const [isShow, setIsShow] = useState<boolean>(true);

  const handleAside = (): void => {
    setIsShow(!isShow);
  };

  const handleTemplates = (): void => {
    setIsShow(!isShow);
  };

  return (
    <div className="aside-container">
      {isShow
        ? (
          <aside className="aside">
            <button className="aside__close" aria-label="Hide" type="button" onClick={handleAside} />
            <div className="aside__container">
              <div className="aside__title">
                <p className="aside__avatar">{String(user.login[0]).toUpperCase()}</p>
                <div>
                  <p className="aside__name">{user.login}</p>
                  <p className="aside__email">{user.email}</p>
                </div>
              </div>
              <hr />
              <Nav className="me-auto aside__nav">
                <Link to="/boards" className="aside__boards">Boards</Link>
                <Link to="/auth" className="aside__users" onClick={(): void => localStorage.removeItem('token')}>Users</Link>
                <NavDropdown title="Templates" id="basic-nav-dropdown" className="aside__settings">
                  <NavDropdown.Item onClick={handleTemplates} className="aside__theme">Minimal (with 2 cards)</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleTemplates} className="aside__theme">Medium (with 3 cards)</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleTemplates} className="aside__lang">Large (with 4 cards)</NavDropdown.Item>
                </NavDropdown>
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
        )

        : (
          <aside className="aside closed">
            <button className="aside__close arrow-right" aria-label="Hide" type="button" onClick={handleAside} />
          </aside>
        )}
    </div>

  );
};
export { Aside };
