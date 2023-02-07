import React, { useState } from 'react';

import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import './style.scss';

const BoardsPage = (): JSX.Element | null => {
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleModalClose = (): void => setIsModal(false);

  return (
    <section className="boards">
      <h1 className="boards__title">Boards</h1>
      <div className="wrapper">
        <button className="generate-btn" type="button" onClick={(): void => setIsModal(true)}>create board</button>

      </div>

      {isModal ? <ModalWindow show={isModal} handleModal={handleModalClose} /> : null}
    </section>

  );
};

export { BoardsPage };
