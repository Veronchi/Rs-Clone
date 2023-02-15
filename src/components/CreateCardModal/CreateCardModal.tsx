import React, { ChangeEvent, FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { createCard } from '../../http/cardAPI';
import { BoardPageModal } from '../../interfaces';

import './style.scss';

const CreateCardModal = ({
  show, handleModal, BoardId, setCards,
}: BoardPageModal): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const addCard = async (): Promise<void> => {
    try {
      await createCard(title, BoardId);
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleSubmit = (ev: FormEvent): void => {
    ev.preventDefault();
    if (title.trim().length === 0) {
      setIsValid(false);
      setError('Please enter valid title.');
    } else {
      addCard()
        .then(() => setCards())
        .then(() => handleModal(ev));
    }
  };

  const handleTitle = (ev: ChangeEvent<HTMLInputElement>): void => {
    setIsValid(true);
    setTitle(ev.target.value);
  };

  return (
    <Modal show={show}>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            {isValid
              ? (
                <Form.Control
                  className="valid-title"
                  autoFocus
                  type="text"
                  placeholder="Add title"
                  value={title}
                  onChange={handleTitle}
                />
              )
              : (
                <Form.Control
                  className="invalid-title"
                  autoFocus
                  type="text"
                  placeholder={error}
                  value={title}
                  onChange={handleTitle}
                />
              )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Close
        </Button>
        <Button type="submit" variant="success" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCardModal;
