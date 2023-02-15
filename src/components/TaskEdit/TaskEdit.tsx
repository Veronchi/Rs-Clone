import React, {
  ChangeEvent, FormEvent, useState,
} from 'react';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ModalConfirm } from './ModalConfirm';
import { IModal } from '../../interfaces';
import './TaskEdit.scss';

export interface IRow {
  id: number;
  text: string;
  cover: string;
  description: string;
  ColumnId: string;
}

export interface IColumnId {
  columnID: string
}

const task: IRow = {
  id: 100,
  text: 'Sdelat chto to horoshee',
  cover: '#ff0000',
  description: 'Vypolnit mnogo chego',
  ColumnId: '100',
};

export const TaskEdit = ({ show, handleModal }: IModal): JSX.Element => {
  const [title, setTitle] = useState<string>(task.text);
  const [isNameBlock, setName] = useState<boolean>(true);
  const [cover, setCover] = useState<string>(task.cover);
  const [desc, setDesc] = useState<string>(task.description);

  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);
  const handleConfirmClose = (): void => { setIsConfirmModal(false); };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleDescChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setDesc(value);
  };

  const handleCover = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setCover(value);
  };

  // const handleMove = (): void => {
  // };

  const handleCopy = (): void => {
  };

  const handleDelete = (): void => {
    setIsConfirmModal(true);
  };

  const handleSubmit = (ev: FormEvent): void => {
    task.cover = cover;
    task.description = desc;
    task.text = title;
    handleModal(ev);
  };

  return (
    <Modal show={show} size="lg">
      <div
        className="task-edit__cover"
        style={{ backgroundColor: cover }}
      >
        <OverlayTrigger
          defaultShow
          key="bottom"
          placement="left"
          overlay={(
            <Tooltip id="tooltip-bottom">
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
                    value={desc}
                    onChange={handleDescChange}
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
                  onClick={handleConfirmClose}
                  className="task-edit__buttons"
                >
                  Move
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleCopy}
                  className="task-edit__buttons"
                >
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleDelete}
                  className="task-edit__buttons"
                >
                  Delete
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
        <Button className="save-btn" type="submit" variant="outline-success" onClick={handleSubmit}>
          Save Task
        </Button>
      </Modal.Footer>
      {isConfirmModal ? (
        <ModalConfirm
          show={isConfirmModal}
          handleModal={handleConfirmClose}
          handleParentModal={handleModal}
        />
      ) : null}
    </Modal>
  );
};
