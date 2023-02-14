import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Card from '../../components/Card/Card';
import ModalWindowCreateCard from '../../components/ModalWindowCreateCard/ModalWindowCreateCard';
import { createCard, getAllCards } from '../../http/cardAPI';
import { ICard, IState } from '../../interfaces';
import { setAllCards } from '../../store/slices/cardsSlice';
import './BoardPage.scss';

const BoardPage = (): JSX.Element => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const boards = useLocation();
  const dispatch = useDispatch();
  const cards = useSelector((state: IState) => state.cards.flat());

  const handleModalClose = (): void => setIsModal(false);

  const addCard = async ({ title, boardId }: ICard): Promise<void> => {
    try {
      await createCard(title, boardId);
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const setCards = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await getAllCards(boards.state.boardId)
        .then((data) => dispatch(setAllCards([data])))
        .then(() => setIsLoading(false));
    } catch (e) {
      console.log((e as Error).message);
    }
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
        <ModalWindowCreateCard addCard={addCard} show={isModal} handleModal={handleModalClose} />
      ) : null}
    </section>
  );
};

export default BoardPage;
