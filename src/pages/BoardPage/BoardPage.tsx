import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Card from '../../components/Card/Card';
import CreateCardModal from '../../components/CreateCardModal/CreateCardModal';
import { getAllCards } from '../../http/cardAPI';
import { IState, IUpdateState } from '../../interfaces';
import { updateCards } from '../../store/slices/cardsSlice';
import './style.scss';

const BoardPage = (): JSX.Element => {
  const initUpdState = {
    isUpdate: false,
    id: '',
    title: '',
  };

  const [isModal, setIsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updateState, setUpdateState] = useState<IUpdateState>(initUpdState);
  const boards = useLocation();
  const dispatch = useDispatch();
  const cards = useSelector((state: IState) => state.cards.flat());

  const setCards = async (): Promise<void> => {
    setIsLoading(true);

    const data = await getAllCards(boards.state.boardId);
    dispatch(updateCards(data));
    setIsLoading(false);
  };

  const handleModalClose = (): void => {
    setUpdateState(initUpdState);
    setIsModal(false);
  };

  useEffect(() => {
    setCards();
  }, []);

  const editCard = (id: string): void => {
    setIsModal(true);

    const currCard = cards.find((i) => i.id === id);
    if (currCard) {
      setUpdateState({
        isUpdate: true,
        id,
        title: currCard.title,
      });
    }
  };

  return (
    <section className="board" style={{ backgroundColor: boards.state.background }}>
      <h1 className="board__title">{boards.state.title}</h1>
      <div className="wrapper">
        {isLoading ? <div className="spinner" />
          : (
            <>
              <ul className="board__list">
                {cards.map((card) => (
                  <Card card={card} key={card.id} editCard={editCard} />
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
      <Modal show={isModal}>
        <CreateCardModal
          handleModal={handleModalClose}
          BoardId={boards.state.boardId}
          updateState={updateState}
        />
      </Modal>
    </section>
  );
};

export default BoardPage;
