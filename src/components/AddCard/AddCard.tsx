import React from 'react';
import { CardProps } from '../../interfaces';
import AddTask from '../AddTask/AddTask';
import './AddCard.scss';

const AddCard = ({ card }: CardProps): JSX.Element => (
  <div className="list">
    <h3 className="list__title">{card.title}</h3>
    <ul className="list__tasks">
      {card.tasks.map((task) => (
        AddTask(task)
      ))}
    </ul>
    <button className="btn btn-secondary list__btn" type="button">
      Add task
    </button>
  </div>
);

export default AddCard;
