import React, {
  ChangeEvent, FC, MouseEvent, useState,
} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { IModal } from '../../interfaces';
import { createBoard, update } from '../../http/boardAPI';
import './style.scss';

export const ModalWindow: FC<IModal> = ({
  handleModal, boards, updateState,
}): JSX.Element => {
  const { isUpdate, boardId, boardTitle } = updateState;
  const [title, setTitle] = useState<string>('' || boardTitle as string);
  const [background, setBackground] = useState<string>('#026aa7');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    if (/^\s+$/.test(value)) {
      setIsValid(true);
    } else {
      setTitle(value);
      setIsValid(true);
    }
  };

  const handleBackgroundChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setBackground(value);
  };

  const handleClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    if (!title) {
      setIsValid(false);
    } else if (isUpdate && boardId) {
      update(boardId, title, background)
        .then(boards)
        .then(() => handleModal(event))
        .catch((e) => alert((e as Error).message));
    } else {
      await createBoard(title, background)
        .then(boards)
        .then(() => handleModal(event))
        .catch((e) => alert((e as Error).message));
    }
  };

  const color = isValid ? 'green' : 'red';

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
              placeholder={isValid ? 'My board title' : 'Enter your title'}
              autoFocus
              onChange={handleTitleChange}
              value={title}
              style={{ borderColor: color }}
            />
            {!isValid ? <span className="validation-text">Enter some text</span> : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>board background</Form.Label>
            <Form.Control
              className="board-color"
              value={background}
              type="color"
              autoFocus
              onChange={handleBackgroundChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleModal}>
          Close
        </Button>
        <Button
          className="save-btn"
          onClick={(e): Promise<void> => handleClick(e)}
        >
          Save
        </Button>
      </Modal.Footer>
    </>

  );
};
