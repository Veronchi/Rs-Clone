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
  const boards = useSelector((state: IState) => state.boards.flat());
  const dispatch = useDispatch();

  const handleModalClose = (): void => setIsModal(false);

  const getBoards = async (): Promise<void> => {
    dispatch(clean());
    await getAllBoards()
      .then((data) => {
        dispatch(addBoards([data]));
      });
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

  return (
    <section className="boards">
      <h1 className="boards__title">Boards</h1>
      <div className="wrapper">
        <div className="boards__buttons">
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
                  </li>
                ))
              }

          </ul>

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
