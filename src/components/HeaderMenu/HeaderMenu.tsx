import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createBoard, getAllBoards } from '../../http/boardAPI';
import { createCard } from '../../http/cardAPI';
import {
  IBoard, TemplateSize,
} from '../../interfaces';
import { updateBoards } from '../../store/slices/boardsSlice';
import { templates } from '../../utils/mocData';
import './style.scss';

const HeaderMenu = (): JSX.Element => {
  const [templateSize, setTemplateSize] = useState<TemplateSize>('small');
  const [isOpenTemplates, setIsOpenTemplates] = useState<boolean>(false);
  const [boardTitle, setBoardTitle] = useState<string>('Template board');
  const [isValid, setIsValid] = useState<boolean>(true);

  const dispatch = useDispatch();

  const getRandomColor = (): string => {
    const red: string = Math.floor(Math.random() * (255 - 20 + 1) + 20).toString(16).padStart(2, '0');
    const green: string = Math.floor(Math.random() * (255 - 20 + 1) + 20).toString(16).padStart(2, '0');
    const blue: string = Math.floor(Math.random() * (255 - 20 + 1) + 20).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
  };

  const getBoards = async (): Promise<void> => {
    const data = await getAllBoards();
    dispatch(updateBoards(data));
  };

  const handleSize = (e: ChangeEvent<HTMLInputElement>): void => {
    const tempName = e.currentTarget.value as TemplateSize;
    setTemplateSize(tempName);
  };

  const handleOpenTemplates = (): void => {
    setIsOpenTemplates(!isOpenTemplates);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    if (/^\s+$/.test(value)) {
      setIsValid(false);
    } else {
      setBoardTitle(value);
      setIsValid(true);
    }
  };

  const handleTemplates = (templateName: TemplateSize, templTitle: string): void => {
    if (boardTitle) {
      const tempBoard = templates[templateName];
      setIsOpenTemplates(false);
      createBoard(templTitle, getRandomColor())
        .then((result: IBoard) => {
          tempBoard.cards.forEach(async (element):Promise<void> => {
            await createCard(element, result.id);
          });
        })
        .then(getBoards);
    } else {
      setIsValid(false);
    }
  };

  const color = isValid ? 'green' : 'red';

  const handleKeyPress = (e: KeyboardEvent): void => {
    const { key, ctrlKey } = e;
    if (key === 'm' && ctrlKey) {
      e.preventDefault();
      setIsOpenTemplates(true);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="menu">

      <Link to="boards" className="menu__boards">Boards</Link>

      <div className="template">
        <Button className="menu__templates" onClick={handleOpenTemplates}>
          Templates&nbsp;
        </Button>

        <Modal
          show={isOpenTemplates}
          backdropClassName="user-modal"
          onHide={():void => { setIsOpenTemplates(false); }}
          className="template__modal"
        >
          <Form className="template__form">
            <h4 className="template__title">Add:</h4>
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
              <Form.Label className="template__label">Board title</Form.Label>
              <Form.Control
                type="text"
                placeholder={isValid ? 'My board name' : 'Enter your name'}
                onChange={handleTitleChange}
                value={boardTitle}
                style={{ borderColor: color }}
              />
              {!isValid ? <span className="validation-text">Enter board name</span> : null}
            </div>
            <hr />
            <div className="template__wrapper">
              <Button
                className="template__submit"
                onClick={():void => {
                  handleTemplates(templateSize, boardTitle);
                }}
              >
                Create board
              </Button>
            </div>
          </Form>
        </Modal>
      </div>

    </div>
  );
};
export { HeaderMenu };
