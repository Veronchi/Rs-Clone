import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { BoardPageModal } from '../../interfaces';
import { newCard } from '../../pages/BoardPage/fakeData';

import './ModalWindowCreateCard.scss';

const ModalWindowCreateCard = ({ show, handleModal, addCard }: BoardPageModal): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleTitle = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(ev.target.value);
  };

  const onSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();
    if (title.trim().length === 0) {
      setError('Please enter valid title.');
      // eslint-disable-next-line no-console
      console.log(error);
      return;
    }
    newCard.title = title;
    addCard(newCard);
    handleModal(ev);
  };

  return (
    <Modal show={show}>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
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
        <Button type="submit" variant="success" onClick={onSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWindowCreateCard;
