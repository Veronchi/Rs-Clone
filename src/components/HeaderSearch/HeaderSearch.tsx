import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAllBoards } from '../../http/boardAPI';
import { getTasksByBoardId } from '../../http/rowAPI';
import { IBoard } from '../../interfaces';
import { updateBoards } from '../../store/slices/boardsSlice';
import './style.scss';

const HeaderSearch = (): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const onChangeValue = (ev: ChangeEvent<HTMLInputElement>): void => {
    setValue(ev.target.value);
  };

  const onChangeActive = (): void => {
    setIsActive(!isActive);
  };

  const filterBoards = async (): Promise<void> => {
    const data = await getAllBoards();
    // eslint-disable-next-line max-len
    const filteredBoards = data.filter((elem: IBoard) => elem.title.toLowerCase().includes(value.toLowerCase()));
    dispatch(updateBoards(filteredBoards));
  };

  const filterTasks = async (): Promise<void> => {
    const data = await getTasksByBoardId(location.state.boardId);
    console.log(data);
  };

  useEffect(() => {
    filterBoards();
    filterTasks();
  }, [value]);

  return (
    <Form className={isActive ? 'search-form active' : 'search-form'}>
      <Form.Control className={isActive ? 'search-form__input' : 'search-form__input'} type="text" placeholder="Search" onChange={onChangeValue} />
      <button type="button" className="search__btn" onClick={onChangeActive}>
        <i className="bx bx-search bx-sm search__icon" />
      </button>
    </Form>
  );
};

export default HeaderSearch;
