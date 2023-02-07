import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { IModal } from '../../interfaces';

import './ModalWindowCreateCard.scss';

function ModalWindowCreateCard({ show, handleModal }: IModal): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [title, setTitle] = useState<string>('');

  function getTitle(ev: React.ChangeEvent<HTMLInputElement>): void {
    setTitle(ev.target.value);
  }

  return (
    <Modal show={show}>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              className="addTitle"
              autoFocus
              type="text"
              placeholder="Add title"
              // eslint-disable-next-line react/jsx-no-bind
              onChange={getTitle}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Close
        </Button>
        <Button variant="success" onClick={handleModal}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWindowCreateCard;
