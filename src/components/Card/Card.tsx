import React, {
  ChangeEvent, FC, useEffect, useState, DragEvent,
} from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCards, remove } from '../../http/cardAPI';
import { createRow, getAllRows, update } from '../../http/rowAPI';
import {
  ICardProps, IState, ITask, ITaskMap,
} from '../../interfaces';
import { updateCards } from '../../store/slices/cardsSlice';
import { addCurrTask } from '../../store/slices/currTaskSlice';
import { removeTask, setAllTasks } from '../../store/slices/tasksSlice';
import CardTask from '../CardTask/CardTask';
import './style.scss';

const Card: FC<ICardProps> = ({ card, editCard }): JSX.Element => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: IState): ITaskMap => state.tasks);
  const currTask = useSelector((state: IState) => state.currTask);

  const [isNewTask, setIsNewTask] = useState<boolean>(false);
  const [isSentTask, setIsSentTask] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [currCardId, setCurrCardId] = useState<string>('');

  const onTaskChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsValid(true);
    setNewTask(e.target.value);
  };

  const addTask = async (text: string, ColumnId: string, BoardId: string): Promise<void> => {
    await createRow(text, ColumnId, BoardId);
    const data = await getAllRows(card.id);
    dispatch(setAllTasks(data));
  };

  const mouseEnter = ():void => setIsHover(true);
  const mouseLeave = ():void => setIsHover(false);

  const deleteCard = async (id: string): Promise<void> => {
    await remove(id);
    const data = await getAllCards(card.BoardId);
    dispatch(updateCards(data));
  };

  useEffect(() => {
    if (isSentTask) {
      if (newTask.length === 0) {
        setIsValid(false);
      } else {
        setIsNewTask(false);
        setIsSentTask(false);
        setNewTask('');
        addTask(newTask, card.id, card.BoardId);
      }
    }
  }, [isSentTask]);

  useEffect(() => {
    (async (): Promise<void> => {
      const data = await getAllRows(card.id);
      dispatch(setAllTasks(data));
    })();
  }, []);

  const updateAfterDrop = async (): Promise<void> => {
    await update({
      id: currTask.id,
      text: currTask.text,
      cover: currTask.cover as string,
      ColumnId: currCardId,
    });
    const data = await getAllRows(currCardId);

    dispatch(removeTask({
      taskId: currTask.id,
      columnId: currTask.ColumnId,
    }));
    dispatch(setAllTasks(data));
  };

  useEffect(() => {
    if (currCardId) {
      updateAfterDrop();
      setCurrCardId('');
    }
  }, [currCardId]);

  const dragStartHandler = (e: DragEvent<HTMLLIElement>, task: ITask): void => {
    dispatch(addCurrTask(task));

    const target = e.target as HTMLLIElement;
    target.style.opacity = '0.4';
  };

  const dragOverHandler = (e: DragEvent<HTMLLIElement>): void => {
    e.preventDefault();
    const target = e.target as HTMLLIElement;
    const li = target.parentElement as HTMLLIElement;

    if (li.className === 'tasks__item') {
      li.style.opacity = '0.4';
    }
  };

  const dragLeavetHandler = (e: DragEvent<HTMLLIElement>): void => {
    const target = e.target as HTMLLIElement;
    const li = target.parentElement as HTMLLIElement;

    li.style.opacity = '1';
  };

  const dragEndHandler = (e: DragEvent<HTMLLIElement>): void => {
    const target = e.target as HTMLLIElement;
    target.style.opacity = '1';
  };

  const dropHandler = async (e: DragEvent<HTMLLIElement>, task: ITask): Promise<void> => {
    e.preventDefault();
    setCurrCardId(task.ColumnId);

    const target = e.target as HTMLLIElement;
    const li = target.parentElement as HTMLLIElement;
    li.style.opacity = '1';
  };

  return (
    <li className="board__item" draggable onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
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
          tasks[card.id]?.map((task) => (
            <CardTask
              task={task}
              key={task.id}
              dragStartHandler={dragStartHandler}
              dragLeavetHandler={dragLeavetHandler}
              dragEndHandler={dragEndHandler}
              dragOverHandler={dragOverHandler}
              dropHandler={dropHandler}
            />
          ))
        }
      </ul>
      {isNewTask
        ? (
          <div className="input-wrapper">
            {isValid
              ? <Form.Control className="task-input valid" type="text" placeholder="Enter new task" value={newTask} onChange={onTaskChange} />
              : <Form.Control className="task-input invalid" type="text" placeholder="Enter new task" value={newTask} onChange={onTaskChange} />}

            <button
              type="button"
              className="input-close"
              onClick={():void => {
                setNewTask('');
                setIsNewTask(false);
              }}
            >
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
