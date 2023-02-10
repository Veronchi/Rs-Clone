import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import ModalWindowCreateCard from '../../components/ModalWindowCreateCard/ModalWindowCreateCard';
import { ICard } from '../../interfaces';
import './BoardPage.scss';
import { cardArray } from './fakeData';

const BoardPage = (): JSX.Element => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleModalClose = (): void => setIsModal(false);

  const addCard = (card: ICard): void => {
    setCards([...cards, card]);
  };

  useEffect(() => {
    setCards(cardArray);
  }, []);

  return (
    <section className="board">
      <h1 className="board__title">Your Desk</h1>
      <div className="wrapper">
        {cards.map((card) => (
          <Card card={card} key={card.id} />
        ))}
        <button
          className="board__btn"
          type="button"
          onClick={(): void => setIsModal(true)}
        >
          Add card
        </button>
      </div>

      {isModal ? (
        <ModalWindowCreateCard addCard={addCard} show={isModal} handleModal={handleModalClose} />
      ) : null}
    </section>
  );
};

export default BoardPage;
