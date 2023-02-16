import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createBoard, getAllBoards } from '../../http/boardAPI';
import { createCard } from '../../http/cardAPI';
import {
  IBoard, IState, TemplateSize, templates,
} from '../../interfaces';
import { addBoards, clean } from '../../store/slices/boardsSlice';
import './style.scss';

const Aside = (): JSX.Element => {
  const user = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState<boolean>(true);

  const handleAside = (): void => {
    setIsShow(!isShow);
  };

  const getRandomColor = (): string => {
    const red: string = Math.floor(Math.random() * (255 - 20 + 1) + 20).toString(16).padStart(2, '0');
    const green: string = Math.floor(Math.random() * (255 - 20 + 1) + 20).toString(16).padStart(2, '0');
    const blue: string = Math.floor(Math.random() * (255 - 20 + 1) + 20).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
  };

  const getBoards = async (): Promise<void> => {
    dispatch(clean());
    await getAllBoards()
      .then((data) => {
        dispatch(addBoards([data]));
      });
  };

  const handleTemplates = (templateName: TemplateSize): void => {
    const tempBoard = templates[templateName];
    createBoard(tempBoard.title, getRandomColor())
      .then((result: IBoard) => {
        tempBoard.cards.forEach(async (element):Promise<void> => {
          await createCard(element, result.id);
        });
      })
      .then(getBoards);
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
                  <NavDropdown.Item onClick={(): void => handleTemplates('small')} className="aside__theme">Small board (2 cards)</NavDropdown.Item>
                  <NavDropdown.Item onClick={(): void => handleTemplates('medium')} className="aside__theme">Medium board (3 cards)</NavDropdown.Item>
                  <NavDropdown.Item onClick={(): void => handleTemplates('big')} className="aside__lang">Big board (4 cards)</NavDropdown.Item>
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
