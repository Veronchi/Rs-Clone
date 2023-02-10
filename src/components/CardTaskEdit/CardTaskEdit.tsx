import React, { useState } from 'react';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IModal } from '../../interfaces';
import './CardTaskEdit.scss';

export const CardTaskEdit = ({ show, handleModal }: IModal): JSX.Element => {
  const [title, setTitle] = useState<string>('To do chto-to');
  const [isNameBlock, setName] = useState<boolean>(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setTitle(value);
  };

  return (
    <Modal show={show} size="lg">
      <Modal.Header>
        <Modal.Title>Task Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Form className="task-edit">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control
                    className="task-edit__name"
                    type="text"
                    onChange={handleNameChange}
                    onFocus={():void => setName(false)}
                    onBlur={(): void => setName(true)}
                    value={title}
                    plaintext={isNameBlock}
                    readOnly={isNameBlock}
                  />
                </Form.Group>
                <Row className="task-edit__cards">
                  <Col md="auto" className="mini-cards">Participants</Col>
                  <Col md="auto" className="mini-cards">Marks</Col>
                  <Col md="auto" className="mini-cards">Notifications?</Col>
                  <Col md="auto" className="mini-cards">Date</Col>
                </Row>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Add a more detailed description…"
                    onChange={handleNameChange}
                    value="dsfjsdkfjskd"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>board background</Form.Label>
                  <Form.Control
                    className="board-color"
                    defaultValue="#026aa7"
                    type="color"
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col md="auto">
              <p>Add to card</p>
              <div className="grid-vertical">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleModal}
                  className="task-edit__buttons"
                >
                  Participants
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleModal}
                  className="task-edit__buttons"
                >
                  Marks
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleModal}
                  className="task-edit__buttons"
                >
                  Checklist
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleModal}
                  className="task-edit__buttons"
                >
                  Dates
                </Button>
              </div>
              <p>Actions</p>
              <div className="grid-vertical">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleModal}
                  className="task-edit__buttons"
                >
                  Move
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleModal}
                  className="task-edit__buttons"
                >
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleModal}
                  className="task-edit__buttons"
                >
                  Archive
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleModal}>
          Close
        </Button>
        <Button className="save-btn" onClick={handleModal}>
          Save Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
