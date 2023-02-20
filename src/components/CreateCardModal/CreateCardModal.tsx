import React, {
  ChangeEvent, FC, FormEvent, useState,
} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { createCard, getAllCards, update } from '../../http/cardAPI';
import { getAllRows } from '../../http/rowAPI';
import { BoardPageModal } from '../../interfaces';
import { setAllCards, updateCards } from '../../store/slices/cardsSlice';
import { setAllTasks } from '../../store/slices/tasksSlice';

import './style.scss';

const CreateCardModal: FC<BoardPageModal> = ({
  handleModal, BoardId, updateState,
}): JSX.Element => {
  const { isUpdate, id, title } = updateState;
  const [cardTitle, setCardTitle] = useState<string>('' || title as string);
  const [isValid, setIsValid] = useState<boolean>(true);

  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (cardTitle.trim().length === 0) {
      setIsValid(false);
    } else if (isUpdate) {
      await update(id, cardTitle);
      const data = await getAllCards(BoardId);
      dispatch(updateCards(data));

      const taska = await getAllRows(id);
      dispatch(setAllTasks(taska));
    } else {
      const data = await createCard(cardTitle, BoardId);
      dispatch(setAllCards([data]));
    }

    setCardTitle('');
    handleModal(e);
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
