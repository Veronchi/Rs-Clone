import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import CreateCardModal from '../../components/CreateCardModal/CreateCardModal';
import { setBoardToRecent } from '../../components/HeaderMenu/HeaderMenu';
import { getAllCards } from '../../http/cardAPI';
import { IState, IUpdateState } from '../../interfaces';
import { updateCards } from '../../store/slices/cardsSlice';
import { initUpdCardState } from '../../utils/initalStates';
import './style.scss';

const BoardPage = (): JSX.Element => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updateState, setUpdateState] = useState<IUpdateState>(initUpdCardState);

  const boards = useLocation();
  const dispatch = useDispatch();
  const cards = useSelector((state: IState) => state.cards.flat());
  const navigate = useNavigate();

  const setCards = async (): Promise<void> => {
    setIsLoading(true);

    const data = await getAllCards(boards.state.boardId);
    dispatch(updateCards(data));
    setIsLoading(false);
  };

  const handleModalClose = (): void => {
    setUpdateState(initUpdCardState);
    setIsModal(false);
  };

  useEffect(() => {
    if (boards.state) {
      setCards();
      setBoardToRecent(boards.state.boardId);
    } else {
      navigate('/', { replace: true });
    }
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

  const handleKeyPress = (e: KeyboardEvent): void => {
    const { key, ctrlKey } = e;
    if (key === 'c' && ctrlKey) {
      e.preventDefault();
      setIsModal(true);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <section className="board">
      <h1 className="board__title">{boards.state?.title}</h1>
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
          BoardId={boards.state?.boardId}
          updateState={updateState}
        />
      </Modal>
    </section>
  );
};

export default BoardPage;
