import React, {
  ChangeEvent, FC, useEffect, useState,
} from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createRow, getAllRows } from '../../http/rowAPI';
import { CardProps, IState } from '../../interfaces';
import { clean, setAllTasks } from '../../store/slices/tasksSlice';
import CardTask from '../CardTask/CardTask';
import './style.scss';

const Card: FC<CardProps> = ({ card }): JSX.Element => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: IState) => state.tasks.flat());
  const [isNewTask, setIsNewTask] = useState<boolean>(false);
  const [isSentTask, setIsSentTask] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const setTask = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsValid(true);
    setNewTask(e.target.value);
  };

  const addTask = async (text: string, ColumnId: string): Promise<void> => {
    try {
      await createRow(text, ColumnId);
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const setTasks = async (): Promise<void> => {
    dispatch(clean());
    try {
      await getAllRows(card.id)
        .then((data) => {
          dispatch(setAllTasks([data]));
        });
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const currTasks = tasks.filter((item) => item.ColumnId === card.id);

  useEffect(() => {
    if (isSentTask) {
      if (newTask.length === 0) {
        setIsValid(false);
      } else {
        addTask(newTask, card.id);
        setIsNewTask(false);
        setTasks();
      }
    }
  }, [isSentTask]);

  useEffect(() => {
    setTasks();
  }, []);

  return (
    <>
      <h3 className="title">{card.title}</h3>
      <ul className="tasks">
        {
          currTasks.map((task) => (
            <li className="tasks__item" key={task.id}>
              <CardTask task={task} />
            </li>
          ))
        }
      </ul>
      {isNewTask
        ? (
          <div className="input-wrapper">
            {isValid
              ? <Form.Control className="task-input valid" type="text" placeholder="Enter new task" value={newTask} onChange={setTask} />
              : <Form.Control className="task-input invalid" type="text" placeholder="Enter new task" value={newTask} onChange={setTask} />}

            <button type="button" className="input-close" onClick={():void => setIsNewTask(false)}>
              x
            </button>
          </div>
        )
        : null}
      {isNewTask
        ? (
          <button className="btn btn-secondary list__btn" type="button" onClick={(): void => setIsSentTask(true)}>
            Add task
          </button>
        )
        : (
          <button className="btn btn-secondary list__btn" type="button" onClick={(): void => setIsNewTask(true)}>
            Add task
          </button>
        )}
    </>
  );
};

export default Card;
