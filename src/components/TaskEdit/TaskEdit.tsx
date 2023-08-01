import React, {
  ChangeEvent, FormEvent, useEffect, useState,
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
  const [cover, setCover] = useState<string>(task.cover || '#f8e6e0');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [copyText, setCopyText] = useState<string>('Copy');

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

  const handleCopy = (): void => {
    navigator.clipboard.writeText(title);

    setCopyText('Copied!');

    setTimeout(() => {
      setCopyText('Copy');
    }, 1000);
  };

  const handleSubmit = async (e: FormEvent | KeyboardEvent): Promise<void> => {
    e.preventDefault();
    if (title.trim().length === 0) {
      setIsValid(false);
    } else {
      const isUpdate = await update({
        id: task.id,
        text: title,
        cover: cover as string,
      });
      if (isUpdate) {
        dispatch(updateTask({
          task: { ...task, text: title, cover },
          columnId: task.ColumnId,
        }));
      }
      handleModal(e);
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
                  onClick={handleCopy}
                  className="task-edit__buttons"
                >
                  {copyText}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Close
        </Button>
        <Button type="submit" className="success-btn" onClick={handleSubmit}>
          Save Task
        </Button>
      </Modal.Footer>

    </>

  );
};
