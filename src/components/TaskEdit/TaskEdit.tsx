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
import { useDispatch } from 'react-redux';
import { IModalEdit } from '../../interfaces';
import { update } from '../../http/rowAPI';
import { updateTask } from '../../store/slices/tasksSlice';
import './style.scss';

export const TaskEdit = ({ handleModal, task }: IModalEdit): JSX.Element => {
  const [title, setTitle] = useState<string>(task.text);
  const [isNameBlock, setName] = useState<boolean>(true);
  const [cover, setCover] = useState<string | undefined>(task.cover || '#ffffff');
  const [isValid, setIsValid] = useState<boolean>(true);

  const dispatch = useDispatch();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setTitle(value);
    setIsValid(true);
  };

  const handleCover = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setCover(value);
  };

  // const handleMove = (): void => {
  // };

  const handleCopy = (): void => {
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (title.trim().length === 0) {
      setIsValid(false);
    } else {
      const isUpdate = await update(task.id, title, cover as string);
      if (isUpdate) {
        dispatch(updateTask({
          task: { ...task, text: title, cover },
          columnId: task.ColumnId,
        }));
      }
      handleModal(e);
    }
  };

  return (
    <>
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
                  {isValid
                    ? (
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
                    )
                    : (
                      <Form.Control
                        className="task-edit__name invalid-title"
                        type="text"
                        onChange={handleNameChange}
                        onFocus={():void => setName(false)}
                        onBlur={(): void => setName(true)}
                        value={title}
                        placeholder="Please enter valid task тфьу"
                        readOnly={isNameBlock}
                        style={{ fontSize: '1.5rem' }}
                      />
                    )}
                  {!isValid ? <span className="validation-text">Enter task name</span> : null}
                </Form.Group>
              </Form>
            </Col>
            <Col md="auto">
              <p>Actions</p>
              <div className="grid-vertical">
                <Button
                  size="sm"
                  variant="secondary"
                  // onClick={handleConfirmClose}
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
                  // onClick={handleDelete}
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

    </>

  );
};
