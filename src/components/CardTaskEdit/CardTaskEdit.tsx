import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { IModal } from '../../interfaces';
import './style.scss';

export const CardTaskEdit = ({ show, handleModal }: IModal): JSX.Element => {
  const [title, setTitle] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setTitle(value);
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Task Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>board title</Form.Label>
            <Form.Control
              type="text"
              placeholder="My board name"
              autoFocus
              onChange={handleChange}
              value={title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>board background</Form.Label>
            <Form.Control
              className="board-color"
              defaultValue="#026aa7"
              type="color"
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleModal}>
          Close
        </Button>
        <Button className="save-btn" onClick={handleModal}>
          Save Board
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
