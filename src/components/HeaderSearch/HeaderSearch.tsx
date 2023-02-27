import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAllBoards } from '../../http/boardAPI';
import { getTasksByBoardId } from '../../http/rowAPI';
import {
  IBoard, IState, ITask, ITaskMap,
} from '../../interfaces';
import { updateBoards } from '../../store/slices/boardsSlice';
import { updateTask } from '../../store/slices/tasksSlice';
import './style.scss';

const HeaderSearch = (): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const tasks = useSelector((state: IState): ITaskMap => state.tasks);

  const onChangeValue = (ev: ChangeEvent<HTMLInputElement>): void => {
    setValue(ev.target.value);
  };

  const onChangeActive = (): void => {
    setIsActive(!isActive);
  };

  const filterBoards = async (): Promise<void> => {
    const data = await getAllBoards();
    const filteredBoards = data.filter((elem: IBoard) => {
      const res = elem.title.toLowerCase().includes(value.toLowerCase());
      return res;
    });
    dispatch(updateBoards(filteredBoards));
  };

  const filterTasks = async (): Promise<void> => {
    const data = await getTasksByBoardId(location.state.boardId);
    const filteredTasks = data.filter((elem: ITask) => {
      const res = elem.text.toLowerCase().includes(value.toLowerCase());
      return res;
    });
    const newItem = { opacity: true };
    const arr = filteredTasks.map((item: ITask) => Object.assign(item, newItem));
    arr.map((item: ITask) => dispatch(updateTask({ task: item, columnId: item.ColumnId })));
    console.log(tasks);
  };

  useEffect(() => {
    filterBoards();
    filterTasks();
  }, [value]);

  const handleKeyPress = (e: KeyboardEvent): void => {
    const { key, ctrlKey } = e;
    if (key === 'f' && ctrlKey) {
      e.preventDefault();
      setIsActive(true);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <Form className={isActive ? 'search-form active' : 'search-form'}>
      <Form.Control className={isActive ? 'search-form__input' : 'search-form__input'} type="text" autoFocus placeholder="Search" onChange={onChangeValue} />
      <button type="button" className="search__btn" onClick={onChangeActive}>
        <i className="bx bx-search bx-sm search__icon" />
      </button>
    </Form>
  );
};

export default HeaderSearch;
