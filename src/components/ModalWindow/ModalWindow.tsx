import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { IModal } from '../../interfaces';
import { createBoard } from '../../http/boardAPI';
import './style.scss';

export const ModalWindow = ({ show, handleModal }: IModal): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const [background, setBackground] = useState<string>('#026aa7');
  const [isSave, setIsSave] = useState<boolean>(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setBackground(value);
  };

  const handleSave = async (): Promise<void> => {
    try {
      await createBoard(title, background);
      setIsSave(false);
    } catch (e) {
      alert((e as Error).message);
    }
  };

  useEffect(() => {
    if (isSave) handleSave();
  }, [isSave]);

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Add Board</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>board title</Form.Label>
            <Form.Control
              type="text"
              placeholder="My board name"
              autoFocus
              onChange={handleTitleChange}
              value={title}
            />
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
        <Button className="save-btn" onClick={():void => setIsSave(true)}>
          Save Board
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
