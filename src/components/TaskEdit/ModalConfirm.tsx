import React, { FormEvent } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IParentModal } from '../../interfaces';
import { remove } from '../../http/rowAPI';

export const ModalConfirm = (
  {
    show, handleModal, handleParentModal, task,
  }: IParentModal,
): JSX.Element => {
  const deleteTask = (ev: FormEvent): void => {
    remove(task.id)
      .then(() => handleParentModal(ev));
  };

  return (
    <Modal show={show} animation={false} centered>
      <Alert variant="danger" style={{ margin: '0' }}>
        <Modal.Header style={{ borderBottomColor: '#842029' }}>
          <Modal.Title>Delete task</Modal.Title>
        </Modal.Header>
        <Modal.Body>The task will be deleted. Are you sure?</Modal.Body>
        <Modal.Footer style={{ borderTopColor: '#842029' }}>
          <Button variant="outline-success" onClick={handleModal}>
            No
          </Button>
          <Button variant="outline-danger" onClick={deleteTask}>
            Yes
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
};
