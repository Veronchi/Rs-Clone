import React, {
  ChangeEvent, FC, FormEvent, useState,
} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { createCard, update } from '../../http/cardAPI';
import { BoardPageModal } from '../../interfaces';

import './style.scss';

const CreateCardModal: FC<BoardPageModal> = ({
  handleModal, BoardId, setCards, updateState,
}): JSX.Element => {
  const { isUpdate, id, title } = updateState;
  const [cardTitle, setCardTitle] = useState<string>('' || title as string);
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (cardTitle.trim().length === 0) {
      setIsValid(false);
    } else if (isUpdate) {
      await update(id, cardTitle)
        .then(setCards)
        .then(() => setCardTitle(''))
        .then(() => handleModal(e))
        .catch((err) => console.log((err as Error).message));
    } else {
      await createCard(cardTitle, BoardId)
        .then(() => setCards())
        .then(() => handleModal(e))
        .catch((err) => console.log((err as Error).message));
    }
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    if (/^\s+$/.test(value)) {
      setIsValid(false);
    } else {
      setCardTitle(value);
      setIsValid(true);
    }
  };

  return (
    <>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              className={isValid ? 'valid-title' : 'invalid-title'}
              autoFocus
              type="text"
              placeholder={isValid ? 'Enter card name' : 'Please enter valid name'}
              value={cardTitle}
              onChange={handleTitle}
            />
            {!isValid ? <span className="validation-text">Enter some text</span> : null}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Close
        </Button>
        <Button type="button" variant="success" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </>

  );
};

export default CreateCardModal;
