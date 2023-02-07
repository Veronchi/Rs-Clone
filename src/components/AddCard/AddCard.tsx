import React from 'react';
import { ICard } from '../../interfaces';
import './AddCard.scss';

export interface CardProps {
  card: ICard;
}

function AddCard({ card }: CardProps): JSX.Element {
  return (
    <div className="card">
      <h3 className="card__title">{card.title}</h3>
      <div className="card__tasks" />
      <button className="btn btn-secondary" type="button">
        Add task
      </button>
    </div>
  );
}

export default AddCard;
