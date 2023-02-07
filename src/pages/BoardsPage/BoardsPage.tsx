import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import './style.scss';

const boardArray = [
  {
    id: 1,
    name: 'Moya borda',
    color: '#CC9966',
  },
  {
    id: 2,
    name: 'Our Trello',
    color: '#998877',
  }];

const BoardsPage = (): JSX.Element | null => {
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleModalClose = (): void => setIsModal(false);

  const navigate = useNavigate();

  return (
    <section className="boards">
      <h1 className="boards__title">Boards</h1>
      <div className="wrapper">
        <div className="boards__buttons">
          <button className="generate-btn" type="button" onClick={(): void => setIsModal(true)}>Create board</button>
          {
            boardArray.map((element): JSX.Element => (
              <button
                type="button"
                key={element.id}
                className="boards__item"
                style={{ backgroundColor: element.color }}
                onClick={(): void => navigate('/board')}
              >
                <span className="boards__item-title">
                  {element.name}
                </span>
              </button>
            ))
          }
        </div>
      </div>

      {isModal ? <ModalWindow show={isModal} handleModal={handleModalClose} /> : null}
    </section>

  );
};

export { BoardsPage };
