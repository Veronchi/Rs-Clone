import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createBoard, getAllBoards } from '../../http/boardAPI';
import { createCard } from '../../http/cardAPI';
import { IBoard, IState } from '../../interfaces';
import './style.scss';

type NameTempl = 'minimal' | 'medium' | 'large';

const template = {
  minimal: {
    title: 'Minimal board',
    background: '#009900',
    cards: ['To do', 'Done'],
  },
  medium: {
    title: 'Medium board',
    background: '#000099',
    cards: ['To do', 'Doing', 'Done'],
  },
  large: {
    title: 'Large board',
    background: '#990000',
    cards: ['Backlog', 'To do', 'Doing', 'Done'],
  },
};

const Aside = (): JSX.Element => {
  const user = useSelector((state: IState) => state.user);
  const boards = useSelector((state: IState) => state.boards);
  const [isShow, setIsShow] = useState<boolean>(true);
  const dispatch = useDispatch();

  const handleAside = (): void => {
    setIsShow(!isShow);
  };

  const handleTemplates = (templateName: NameTempl): void => {
    const tempBoard = template[templateName];
    createBoard(tempBoard.title, tempBoard.background)
      .then((result: IBoard) => {
        tempBoard.cards.forEach(async (element):Promise<void> => {
          await createCard(element, result.id);
        });
      });
    // .then(
    //   dispatch(clean());
    //   await getAllBoards()
    //   .then((data) => {
    //     dispatch(addBoards([data]));
    //   }));
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
                  <NavDropdown.Item onClick={(): void => handleTemplates('minimal')} className="aside__theme">Minimal (with 2 cards)</NavDropdown.Item>
                  <NavDropdown.Item onClick={(): void => handleTemplates('medium')} className="aside__theme">Medium (with 3 cards)</NavDropdown.Item>
                  <NavDropdown.Item onClick={(): void => handleTemplates('large')} className="aside__lang">Large (with 4 cards)</NavDropdown.Item>
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
