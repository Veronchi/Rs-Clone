import React, { useState } from 'react';
import AddCard from '../../components/AddCard/AddCard';
import ModalWindowCreateCard from '../../components/ModalWindowCreateCard/ModalWindowCreateCard';
import { ICard } from '../../interfaces';
import './BoardPage.scss';

export const deckArray: ICard[] = [
  {
    id: 1,
    title: 'To Do',
    tasks: ['Pokushat', 'Sleep'],
  },
  {
    id: 2,
    title: 'In Process',
    tasks: ['Pokodit', 'Drink tea', 'Pokushat'],
  },
  {
    id: 3,
    title: 'Review',
    tasks: [''],
  },
  {
    id: 4,
    title: 'Done',
    tasks: ['Razdvatri', '123456'],
  },
];

const BoardPage = (): JSX.Element => {
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleModalClose = (): void => setIsModal(false);

  return (
    <section className="board">
      <h1 className="board__title">Your Desk</h1>
      <div className="wrapper">
        {deckArray.map((card) => (
          <AddCard card={card} key={card.id} />
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
        <ModalWindowCreateCard show={isModal} handleModal={handleModalClose} />
      ) : null}
    </section>
  );
};

export default BoardPage;
