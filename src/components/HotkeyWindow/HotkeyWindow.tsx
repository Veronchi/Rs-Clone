import React, {
  FC, useEffect,
} from 'react';
import {
  Button, Col, Container, Modal, Row,
} from 'react-bootstrap';
import { IModalKeys } from '../../interfaces';

export const HotkeyWindow: FC<IModalKeys> = ({ handleModal }): JSX.Element => {
  const handleKeyPress = (e: KeyboardEvent): void => {
    const { key } = e;
    if (key === 'Escape') {
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
      <Modal.Header>
        <Modal.Title>Hot keys:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <h5>
            Boards page
          </h5>
          <Row>
            <Col xs={3}>Ctrl + b</Col>
            <Col xs={7}>Create board</Col>
          </Row>
          <Row>
            <Col xs={3}>Ctrl + m</Col>
            <Col xs={7}>Open template window</Col>
          </Row>
          <hr />
          <h5>
            Board page
          </h5>
          <Row>
            <Col xs={3}>Ctrl + c</Col>
            <Col xs={7}>Add card</Col>
          </Row>
          <Row>
            <Col xs={3}>Ctrl + m</Col>
            <Col xs={7}>Open template window</Col>
          </Row>
          <hr />
          <h5>
            Board edit, card edit, task edit window
          </h5>
          <Row>
            <Col xs={3}>Ctrl + s</Col>
            <Col xs={7}>Save</Col>
          </Row>
          <Row>
            <Col xs={3}>Esc</Col>
            <Col xs={7}>Close window</Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
};
