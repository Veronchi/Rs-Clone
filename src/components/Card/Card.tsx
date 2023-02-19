import React, {
  ChangeEvent, FC, useEffect, useState,
} from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../../http/cardAPI';
import { createRow, getAllRows } from '../../http/rowAPI';
import { ICardProps, IState } from '../../interfaces';
import { clean, setAllTasks } from '../../store/slices/tasksSlice';
import CardTask from '../CardTask/CardTask';
import './style.scss';

const Card: FC<ICardProps> = ({ card, setCards, editCard }): JSX.Element => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: IState) => state.tasks.flat());
  const [isNewTask, setIsNewTask] = useState<boolean>(false);
  const [isSentTask, setIsSentTask] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isHover, setIsHover] = useState<boolean>(false);

  const setTask = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsValid(true);
    setNewTask(e.target.value);
  };

  const setTasks = async (): Promise<void> => {
    dispatch(clean());
    await getAllRows(card.id)
      .then((data) => {
        dispatch(setAllTasks(data));
      })
      .catch((e) => console.log((e as Error).message));
  };

  const addTask = async (text: string, ColumnId: string, BoardId: string): Promise<void> => {
    await createRow(text, ColumnId, BoardId)
      .then(() => setTasks())
      .catch((e) => console.log((e as Error).message));
  };

  const currTasks = tasks.filter((item) => item.ColumnId === card.id);

  const mouseEnter = ():void => setIsHover(true);
  const mouseLeave = ():void => setIsHover(false);

  const deleteCard = async (id: string): Promise<void> => {
    await remove(id)
      .then(() => setCards());
  };

  useEffect(() => {
    if (isSentTask) {
      if (newTask.length === 0) {
        setIsValid(false);
      } else {
        setIsNewTask(false);
        setIsNewTask(false);
        addTask(newTask, card.id, card.BoardId);
      }
    }
  }, [isSentTask]);

  useEffect(() => {
    setTasks();
  }, []);

  return (
    <li className="board__item" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <h3 className="title">{card.title}</h3>
      { isHover
        ? (
          <span className="icons">
            <button className="icons__btn" type="button" onClick={(): void => editCard(card.id)}>
              <i className="bx bx-pencil bx-sm icon" />
            </button>
            <button className="icons__btn" type="button" onClick={(): Promise<void> => deleteCard(card.id)}>
              <i className="bx bx-trash bx-sm icon" />
            </button>
          </span>
        ) : null }
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
    </li>
  );
};

export default Card;
