import React, {
  ChangeEvent, FC, MouseEvent, useEffect, useState,
} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { IModal } from '../../interfaces';
import { createBoard, getAllBoards, update } from '../../http/boardAPI';
import { addBoards, updateBoards } from '../../store/slices/boardsSlice';
import './style.scss';

export const ModalWindow: FC<IModal> = ({
  handleModal, updateState,
}): JSX.Element => {
  const dispatch = useDispatch();
  const {
    isUpdate, id, title, background,
  } = updateState;
  const [boardTitle, setBoardTitle] = useState<string>('' || title as string);
  const [boardBackground, setBackground] = useState<string>(background || '#F5E1C8');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    if (/^\s+$/.test(value)) {
      setIsValid(false);
    } else {
      setBoardTitle(value);
      setIsValid(true);
    }
  };

  const handleBackgroundChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setBackground(value);
  };

  const handleClick = async (event: MouseEvent | KeyboardEvent): Promise<void> => {
    if (!boardTitle) {
      setIsValid(false);
    } else if (isUpdate) {
      await update(id, boardTitle, boardBackground);
      const updBoards = await getAllBoards();
      dispatch(updateBoards(updBoards));
      handleModal(event);
    } else {
      const board = await createBoard(boardTitle, boardBackground);
      dispatch(addBoards([board]));
      handleModal(event);
    }
  };

  const color = isValid ? 'green' : 'red';

  const handleKeyPress = (e: KeyboardEvent): void => {
    const { key, ctrlKey } = e;
    if (key === 's' && ctrlKey) {
      e.preventDefault();
      handleClick(e);
    } else if (key === 'Escape') {
      handleModal(e);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <Modal.Header>
        {isUpdate
          ? <Modal.Title>Update Board</Modal.Title>
          : <Modal.Title>Add Board</Modal.Title>}
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>board title</Form.Label>
            <Form.Control
              type="text"
              placeholder={isValid ? 'My board name' : 'Enter your name'}
              autoFocus
              onChange={handleTitleChange}
              value={boardTitle}
              style={{ borderColor: color }}
            />
            {!isValid ? <span className="validation-text">Enter board name</span> : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>board background</Form.Label>
            <Form.Control
              className="board-color"
              value={boardBackground}
              type="color"
              autoFocus
              onChange={handleBackgroundChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Close
        </Button>
        <Button
          className="success-btn"
          onClick={(e): Promise<void> => handleClick(e)}
        >
          Save
        </Button>
      </Modal.Footer>
    </>

  );
};
