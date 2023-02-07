import React from 'react';

const AddTask = (task: string): JSX.Element => (
  <li className="list__item">
    {task}
  </li>
);

export default AddTask;
