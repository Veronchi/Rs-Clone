import React, {
  ChangeEvent, useEffect, useState,
} from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAllBoards } from '../../http/boardAPI';
import { getTasksByBoardId } from '../../http/rowAPI';
import {
  IBoard,
} from '../../interfaces';
import { updateBoards } from '../../store/slices/boardsSlice';
import { setAllTasks, searchUpdateTask } from '../../store/slices/tasksSlice';
import './style.scss';

const HeaderSearch = (): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const restartSearch = async (): Promise<void> => {
    if (location.state) {
      const data = await getTasksByBoardId(location.state.boardId);
      dispatch(setAllTasks(data));
    } else {
      const data = await getAllBoards();
      dispatch(updateBoards(data));
    }
  };

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
    const result = data.map((item) => {
      if (!item.text.toLowerCase().includes(value.toLowerCase())) {
        const newItem = item;
        newItem.opacity = false;
      } else {
        const newItem = item;
        newItem.opacity = true;
      }
      return item;
    });

    dispatch(searchUpdateTask(result));
  };

  useEffect(() => {
    if (location.state && value) {
      filterTasks();
    } else if (value) {
      filterBoards();
    }
    if (!value) {
      restartSearch();
    }
  }, [value]);

  const handleKeyPress = (e: KeyboardEvent): void => {
    const { key, ctrlKey } = e;
    if (key === 'f' && ctrlKey) {
      e.preventDefault();
      setIsActive(true);
    } else if (key === 'Enter') {
      e.preventDefault();
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
      <Form.Control
        className={isActive ? 'search-form__input' : 'search-form__input'}
        type="text"
        placeholder="Search"
        onChange={onChangeValue}
      />
      <button
        type="button"
        className="search__btn"
        onClick={onChangeActive}
      >
        <i className="bx bx-search bx-sm search__icon" />
      </button>
    </Form>
  );
};

export default HeaderSearch;
