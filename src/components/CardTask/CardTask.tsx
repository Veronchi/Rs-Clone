import React from 'react';
import { Task } from '../../interfaces';

const CardTask = ({ name }: Task): JSX.Element => (
  <li className="list__item">
    {name}
  </li>
);

export default CardTask;
