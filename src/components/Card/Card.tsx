import React, { useState } from 'react';
import { CardProps } from '../../interfaces';
import CardTask from '../CardTask/CardTask';
import './Card.scss';

const Card = ({ card }: CardProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isModal, setIsModal] = useState<boolean>(false);
  return (
    <div className="list">
      <h3 className="list__title">{card.title}</h3>
      <ul className="list__tasks">
        {card.tasks.map(({ name, key }) => <CardTask name={name} key={key} />)}
      </ul>
      <button className="btn btn-secondary list__btn" type="button">
        Add task
      </button>
    </div>
  );
};

export default Card;
