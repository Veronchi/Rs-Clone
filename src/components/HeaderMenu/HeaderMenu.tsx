import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createBoard, getAllBoards } from '../../http/boardAPI';
import { createCard } from '../../http/cardAPI';
import {
  IBoard, TemplateSize, templates,
} from '../../interfaces';
import { addBoards, clean } from '../../store/slices/boardsSlice';
import './style.scss';

const HeaderMenu = (): JSX.Element => {
  // const user = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();

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
    <div className="menu">
      <Link to="/boards" className="menu__boards">Boards</Link>
      <NavDropdown title="Templates" id="basic-nav-dropdown" className="menu__templates">
        <NavDropdown.Item onClick={(): void => handleTemplates('small')} className="aside__theme">Small board (2 cards)</NavDropdown.Item>
        <NavDropdown.Item onClick={(): void => handleTemplates('medium')} className="aside__theme">Medium board (3 cards)</NavDropdown.Item>
        <NavDropdown.Item onClick={(): void => handleTemplates('big')} className="aside__lang">Big board (4 cards)</NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};
export { HeaderMenu };
