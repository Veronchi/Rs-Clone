import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Card from '../../components/Card/Card';
import ModalWindowCreateCard from '../../components/ModalWindowCreateCard/ModalWindowCreateCard';
import { getAllCards } from '../../http/cardAPI';
import { IState } from '../../interfaces';
import { clean, setAllCards } from '../../store/slices/cardsSlice';
import './BoardPage.scss';

const BoardPage = (): JSX.Element => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const boards = useLocation();
  const dispatch = useDispatch();
  const cards = useSelector((state: IState) => state.cards.flat());

  const setCards = async (): Promise<void> => {
    setIsLoading(true);
    dispatch(clean());
    try {
      await getAllCards(boards.state.boardId)
        .then((data) => dispatch(setAllCards([data])))
        .then(() => setIsLoading(false));
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleModalClose = (): void => {
    setIsModal(false);
  };

  useEffect(() => {
    setCards();
  }, []);

  return (
    <section className="board">
      <h1 className="board__title">{boards.state.title}</h1>
      <div className="wrapper" style={{ backgroundColor: boards.state.background }}>
        {isLoading ? <div className="spinner" />
          : (
            <>
              <ul className="board__list">
                {cards.map((card) => (
                  <li className="board__item" key={card.id}>
                    <Card card={card} />
                  </li>
                ))}

              </ul>
              <button
                className="board__btn"
                type="button"
                onClick={(): void => setIsModal(true)}
              >
                Add card
              </button>
            </>
          )}

      </div>

      {isModal ? (
        <ModalWindowCreateCard
          show={isModal}
          handleModal={handleModalClose}
          BoardId={boards.state.boardId}
          setCards={setCards}
        />
      ) : null}
    </section>
  );
};

export default BoardPage;
