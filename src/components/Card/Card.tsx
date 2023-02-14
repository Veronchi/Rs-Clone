import React from 'react';
import { CardProps } from '../../interfaces';
import CardTask from '../CardTask/CardTask';
import './Card.scss';

const Card = ({
  card, onDragStart, onDrop, onDragOver, onDragEnd,
}: CardProps): JSX.Element => (
  <div
    onDragStart={(ev): void => onDragStart(ev, card)}
    onDrop={(ev): void => onDrop(ev, card)}
    onDragOver={(ev): void => onDragOver(ev)}
    onDragEnd={(ev): void => onDragEnd(ev)}
    draggable
    className="list"
  >
    <h3 className="list__title">{card.title}</h3>
    <ul className="list__tasks">
      {card.tasks.map(({ name, key }) => (
        <CardTask
          name={name}
          key={key}
        />
      ))}
    </ul>
    <button className="btn btn-secondary list__btn" type="button">
      Add task
    </button>
  </div>
);
export default Card;
