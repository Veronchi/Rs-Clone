import React, {
  useEffect, useState,
} from 'react';
import tinycolor from 'tinycolor2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { getAllBoards, remove } from '../../http/boardAPI';
import {
  IBoard, IState, IUpdateState,
} from '../../interfaces';
import { updateBoards } from '../../store/slices/boardsSlice';
import './style.scss';

const BoardsPage = (): JSX.Element | null => {
  const initUpdState = {
    isUpdate: false,
    id: '',
    title: '',
    background: '',
  };

  const [isModal, setIsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updateState, setUpdateState] = useState<IUpdateState>(initUpdState);

  const boards = useSelector((state: IState) => state.boards.flat());
  const dispatch = useDispatch();

  const handleModalClose = (): void => {
    setUpdateState(initUpdState);
    setIsModal(false);
  };

  const getBoards = async (): Promise<void> => {
    setIsLoading(true);
    const data = await getAllBoards();
    dispatch(updateBoards([data]));
    setIsLoading(false);
  };

  useEffect(() => {
    getBoards();
  }, []);

  const getColor = (id: string): string => {
    const currBoard = boards.find((i) => i.id === id) as IBoard;
    if (tinycolor(currBoard.background).isLight()) {
      return '#000';
    }
    return '#fff';
  };

  const handleUpdate = (id: string, title: string, background: string): void => {
    setUpdateState({
      isUpdate: true,
      id,
      title,
      background,
    });
    setIsModal(true);
  };

  const deleteBoard = async (id: string): Promise<void> => {
    await remove(id);
    const data = await getAllBoards();
    dispatch(updateBoards([data]));
  };

  return (
    <section className="boards">
      <h1 className="boards__title">Boards</h1>
      <div className="wrapper">
        <div className="boards__buttons">
          {isLoading
            ? <div className="spinner" />
            : (
              <ul className="boards__list">

                <button className="generate-btn" type="button" onClick={(): void => setIsModal(true)}>Create board</button>
                {
                boards.map(({ id, title, background }): JSX.Element => (
                  <li key={id} className="boards__item" style={{ backgroundColor: background }}>
                    <Link className="boards__link" to="/board" state={{ boardId: id, title, background }}>
                      <span className="boards__item-title" style={{ color: getColor(id) }}>
                        {title}
                      </span>
                    </Link>
                    <div className="boards__icons" id={id}>
                      <button className="boards__button" type="button" onClick={(): void => handleUpdate(id, title, background)}>
                        <i className="bx bx-edit-alt bx-sm icon" style={{ color: getColor(id) }} />
                      </button>
                      <button className="boards__button" type="button" onClick={(): Promise<void> => deleteBoard(id)}>
                        <i className="bx bx-trash bx-sm icon" style={{ color: getColor(id) }} />
                      </button>
                    </div>
                  </li>
                ))
              }
              </ul>
            )}
        </div>
      </div>
      <Modal show={isModal}>
        <ModalWindow
          handleModal={handleModalClose}
          updateState={updateState}
        />
      </Modal>
    </section>

  );
};

export { BoardsPage };
