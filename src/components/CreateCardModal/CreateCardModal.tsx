import React, {
  ChangeEvent, FC, FormEvent, useEffect, useState,
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

  const handleSubmit = async (e: FormEvent | KeyboardEvent): Promise<void> => {
    e.preventDefault();
    if (cardTitle.trim().length === 0) {
      setIsValid(false);
    } else if (isUpdate) {
      await update(id, cardTitle);
      const data = await getAllCards(BoardId);
      dispatch(updateCards(data));

      const task = await getAllRows(id);
      dispatch(setAllTasks(task));
      handleModal(e);
    } else {
      const data = await createCard(cardTitle, BoardId);
      dispatch(setAllCards([data]));
      handleModal(e);
    }

    setCardTitle('');
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

  const handleKeyPress = (e: KeyboardEvent): void => {
    const { key, ctrlKey } = e;
    if (key === 's' && ctrlKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (key === 'Escape') {
      e.preventDefault();
      handleModal(e);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

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
            {!isValid ? <span className="validation-text">Enter card name</span> : null}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Close
        </Button>
        <Button type="button" className="success-btn" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </>

  );
};

export default CreateCardModal;
