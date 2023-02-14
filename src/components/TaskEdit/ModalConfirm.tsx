import React from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IModal } from '../../interfaces';

export const ModalConfirm = ({ show, handleModal }: IModal): JSX.Element => (
  <Modal show={show} animation={false} centered>
    <Alert variant="danger" style={{ margin: '0' }}>
      <Modal.Header>
        <Modal.Title>Delete task</Modal.Title>
      </Modal.Header>
      <Modal.Body>The task will be deleted. Are you sure?</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={handleModal}>
          No
        </Button>
        <Button variant="outline-danger" onClick={handleModal}>
          Yes
        </Button>
      </Modal.Footer>
    </Alert>
  </Modal>
);
