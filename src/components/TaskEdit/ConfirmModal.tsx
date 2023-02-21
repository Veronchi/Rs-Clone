import React from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IParentModal } from '../../interfaces';

export const ConfirmModal = (
  {
    handleModal, deleteTask,
  }: IParentModal,
): JSX.Element => (
  <Alert variant="danger" style={{ margin: '0' }}>
    <Modal.Header style={{ borderBottomColor: '#842029' }}>
      <Modal.Title>Delete task</Modal.Title>
    </Modal.Header>
    <Modal.Body>The task will be deleted. Are you sure?</Modal.Body>
    <Modal.Footer style={{ borderTopColor: '#842029' }}>
      <Button variant="outline-danger" onClick={handleModal}>
        No
      </Button>
      <Button variant="outline-success" onClick={deleteTask}>
        Yes
      </Button>
    </Modal.Footer>
  </Alert>
);
