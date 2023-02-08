import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { IModal } from '../../interfaces';

import './ModalWindowCreateCard.scss';

const ModalWindowCreateCard = ({ show, handleModal }: IModal): JSX.Element => {
  const [title, setTitle] = useState<string>('');

  const handleTitle = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(ev.target.value);
  };

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
              value={title}
              onChange={handleTitle}
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
};

export default ModalWindowCreateCard;
