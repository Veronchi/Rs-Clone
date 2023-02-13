import React, { ChangeEvent, useState } from 'react';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IModal } from '../../interfaces';
import './CardTaskEdit.scss';

export const CardTaskEdit = ({ show, handleModal }: IModal): JSX.Element => {
  const [title, setTitle] = useState<string>('To do chto-to');
  const [isNameBlock, setName] = useState<boolean>(true);
  const [cover, setCover] = useState<string>('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleCover = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setCover(value);
  };

  return (
    <Modal show={show} size="lg">
      <div
        className="task-edit__cover"
        style={{ backgroundColor: cover }}
      >
        <OverlayTrigger
          key="left"
          placement="left"
          overlay={(
            <Tooltip id="tooltip-left">
              Cover color
            </Tooltip>
          )}
        >
          <Form.Control
            className="board-color"
            value={cover}
            type="color"
            autoFocus
            onChange={handleCover}
          />
        </OverlayTrigger>
      </div>
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
                    style={{ fontSize: '1.5rem' }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Add a more detailed description..."
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col md="auto">
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
