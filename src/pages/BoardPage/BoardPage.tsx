/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { DragEventHandler, useEffect, useState } from 'react';
import { CardProps } from 'react-bootstrap';
import Card from '../../components/Card/Card';
import ModalWindowCreateCard from '../../components/ModalWindowCreateCard/ModalWindowCreateCard';
import { ICard } from '../../interfaces';
import './BoardPage.scss';
import { cardArray } from './fakeData';

const BoardPage = (): JSX.Element => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<ICard | null>(null);

  const handleModalClose = (): void => setIsModal(false);

  const addCard = (card: ICard): void => {
    setCards([...cards, card]);
  };

  useEffect(() => {
    setCards(cardArray);
  }, []);

  const onDragStart = (ev: React.DragEvent<HTMLDivElement>, card: ICard): void => {
    setCurrentCard(card);
  };

  const onDragEnd = (ev: React.DragEvent<HTMLDivElement>): void => {
    if (ev.target instanceof Element && ev.target.classList.contains('list')) {
      // eslint-disable-next-line no-param-reassign
      (ev.target as HTMLElement).style.background = 'white';
    }
  };

  const onDragOver = (ev: React.DragEvent<HTMLDivElement>): void => {
    ev.preventDefault();
  };

  const onDrop = (ev: React.DragEvent<HTMLDivElement>, card: ICard): void => {
    ev.preventDefault();
    setCards(cards.map((c: ICard) => {
      if (c.id === card.id) {
        return { ...c, order: (currentCard as ICard).order };
      }
      if (c.id === currentCard!.id) {
        return { ...c, order: card.order };
      }
      return c;
    }));
    if (ev.target instanceof Element && ev.target.classList.contains('list')) {
      // eslint-disable-next-line no-param-reassign
      (ev.target as HTMLElement).style.background = 'white';
    }
  };

  const sortCards = (a: ICard, b: ICard): number => {
    if (a.order > b.order) {
      return 1;
    }
    return -1;
  };

  return (
    <section className="board">
      <h1 className="board__title">Your Desk</h1>
      <div className="wrapper">
        {cards.sort(sortCards).map((card) => (
          <Card
            onDragStart={onDragStart}
            onDragLeave={onDragEnd}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDrop={onDrop}
            card={card}
            key={card.id}
          />
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
