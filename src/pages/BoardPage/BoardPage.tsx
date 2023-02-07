import React, { useState } from 'react';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import './BoardPage.scss';

function BoardPage(): JSX.Element {
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleModalClose = (): void => setIsModal(false);

  return (
    <section className="board">
      <h1 className="board__title">Your Desk</h1>
      <div className="wrapper">
        <button
          className="btn btn-dark"
          type="button"
          onClick={(): void => setIsModal(true)}
        >
          Сreate Card
        </button>
      </div>

      {isModal ? (
        <ModalWindow show={isModal} handleModal={handleModalClose} />
      ) : null}
    </section>
  );
}

export default BoardPage;
