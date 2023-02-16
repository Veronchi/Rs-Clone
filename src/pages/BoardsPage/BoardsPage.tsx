import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { getAllBoards } from '../../http/boardAPI';
import { getUser } from '../../http/userAPI';
import { IState } from '../../interfaces';
import { addBoards, clean } from '../../store/slices/boardsSlice';
import { addUser } from '../../store/slices/userSlice';
import './style.scss';

const BoardsPage = (): JSX.Element | null => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const boards = useSelector((state: IState) => state.boards.flat());
  const dispatch = useDispatch();

  const handleModalClose = (): void => setIsModal(false);

  const getBoards = async (): Promise<void> => {
    setIsLoading(true);
    dispatch(clean());
    await getAllBoards()
      .then((data) => {
        dispatch(addBoards([data]));
      })
      .then(() => setIsLoading(false));
  };

  const getCurrUser = async (): Promise<void> => {
    await getUser()
      .then((data) => {
        dispatch(addUser(data));
      });
  };

  useEffect(() => {
    getBoards();
    getCurrUser();
  }, []);

  const editBoard = (id: string): void => {
    console.log(`Изменяем доску с id - ${id}`);
  };

  const deleteBoard = (id: string): void => {
    console.log(`Удаляем доску с id - ${id}`);
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
                      <span className="boards__item-title">
                        {title}
                      </span>
                    </Link>
                    <div className="boards__icons">
                      <button className="boards__button" type="button" onClick={(): void => editBoard(id)}>
                        <i className="bx bx-edit-alt bx-sm icon" />
                      </button>
                      <button className="boards__button" type="button" onClick={(): void => deleteBoard(id)}>
                        <i className="bx bx-trash bx-sm icon" />
                      </button>
                    </div>
                  </li>
                ))
              }
              </ul>
            )}
        </div>
      </div>

      {isModal ? (
        <ModalWindow
          show={isModal}
          handleModal={handleModalClose}
          boards={getBoards}
        />
      ) : null}
    </section>

  );
};

export { BoardsPage };
