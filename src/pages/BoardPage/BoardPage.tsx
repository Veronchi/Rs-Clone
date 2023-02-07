import React, { useState } from 'react';
import AddCard from '../../components/AddCard/AddCard';
import ModalWindowCreateCard from '../../components/ModalWindowCreateCard/ModalWindowCreateCard';
import { ICard } from '../../interfaces';
import './BoardPage.scss';

export const deckArray: ICard[] = [
  {
    id: 1,
    title: 'To Do',
    tasks: {
      task: ['Razdvatri', '123456'],
    },
  },
  {
    id: 2,
    title: 'In Process',
    tasks: {
      task: ['Razdvatri', '123456', 'fgfgfg'],
    },
  },
  {
    id: 3,
    title: 'Done',
    tasks: {
      task: ['Razdvatri', '123456', 'drink cofeek'],
    },
  },
];

function BoardPage(): JSX.Element {
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
          className="btn btn-success"
          type="button"
          onClick={(): void => setIsModal(true)}
        >
          Сreate Card
        </button>
      </div>

      {isModal ? (
        <ModalWindowCreateCard show={isModal} handleModal={handleModalClose} />
      ) : null}
    </section>
  );
}

export default BoardPage;
