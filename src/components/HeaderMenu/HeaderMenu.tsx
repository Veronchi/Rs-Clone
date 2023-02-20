import React, { ChangeEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBoard, getAllBoards } from '../../http/boardAPI';
import { createCard } from '../../http/cardAPI';
import {
  IBoard, TemplateSize, templates,
} from '../../interfaces';
import { updateBoards } from '../../store/slices/boardsSlice';
import './style.scss';

const HeaderMenu = (): JSX.Element => {
  const [templateSize, setTemplateSize] = useState<TemplateSize>('small');
  const [isOpenTemplates, setIsOpenTemplates] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Small board');
  const isLogon = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getRandomColor = (): string => {
    const red: string = Math.floor(Math.random() * (255 - 20 + 1) + 20).toString(16).padStart(2, '0');
    const green: string = Math.floor(Math.random() * (255 - 20 + 1) + 20).toString(16).padStart(2, '0');
    const blue: string = Math.floor(Math.random() * (255 - 20 + 1) + 20).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
  };

  const getBoards = async (): Promise<void> => {
    const data = await getAllBoards();
    dispatch(updateBoards([data]));
  };

  const handleBoards = (): void => {
    navigate('/boards', { replace: true });
  };

  const handleSize = (e: ChangeEvent<HTMLInputElement>): void => {
    const tempName = e.currentTarget.value as TemplateSize;
    setTemplateSize(tempName);
    setTitle(`${tempName.charAt(0).toUpperCase() + tempName.slice(1)} board`);
  };

  const handleOpenTemplates = (): void => {
    setIsOpenTemplates(!isOpenTemplates);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleTemplates = (templateName: TemplateSize, boardTitle: string): void => {
    const tempBoard = templates[templateName];
    createBoard(boardTitle, getRandomColor())
      .then((result: IBoard) => {
        tempBoard.cards.forEach(async (element):Promise<void> => {
          await createCard(element, result.id);
        });
      })
      .then(getBoards);
  };

  return (
    <div className="menu">
      { isLogon
        ? (
          <Button className="menu__boards" onClick={handleBoards}>Boards</Button>
        )
        : (
          <Button className="menu__boards" disabled>Boards</Button>
        )}
      { isLogon
        ? (
          <div className="template">
            <Button className="menu__templates" onClick={handleOpenTemplates}>
              Templates&nbsp;
              <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor" />
              </svg>
            </Button>
            { isOpenTemplates
              ? (
                <div className="template__form">
                  <Form>
                    <h4 className="template__title">Add board:</h4>
                    <label className="template__radios" htmlFor="radio1">
                      <input
                        type="radio"
                        id="radio1"
                        name="template"
                        className="template__input"
                        value="small"
                        onChange={handleSize}
                        defaultChecked
                      />
                      <span className="template__text">Small board (2 cards)</span>
                    </label>
                    <label className="template__radios" htmlFor="radio2">
                      <input
                        type="radio"
                        id="radio2"
                        name="template"
                        className="template__input"
                        value="medium"
                        onChange={handleSize}
                      />
                      <span className="template__text">Medium board (3 cards)</span>
                    </label>
                    <label className="template__radios" htmlFor="radio3">
                      <input
                        type="radio"
                        id="radio3"
                        name="template"
                        className="template__input"
                        value="big"
                        onChange={handleSize}
                      />
                      <span className="template__text">Big board (4 cards)</span>
                    </label>
                    <hr />
                    <div className="template__wrapper">
                      <Form.Label>Board title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="My board name"
                        onChange={handleTitleChange}
                        value={title}
                      />
                    </div>
                    <hr />
                    <div className="template__wrapper">
                      <Button
                        className="save-btn template__submit"
                        onClick={():void => {
                          setIsOpenTemplates(false);
                          handleTemplates(templateSize, title);
                        }}
                      >
                        Create board
                      </Button>
                    </div>
                  </Form>
                </div>
              ) : null}
          </div>
        )
        : (
          <Button className="menu__templates" disabled>
            Templates&nbsp;
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor" />
            </svg>
          </Button>
        )}
    </div>
  );
};
export { HeaderMenu };
