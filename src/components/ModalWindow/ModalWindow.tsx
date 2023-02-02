import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { IModal } from '../../interfaces';

export function ModalWindow({ show, handleModal }: IModal): JSX.Element {
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>board title</Form.Label>
            <Form.Control
              type="text"
              placeholder="My board name"
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
}
