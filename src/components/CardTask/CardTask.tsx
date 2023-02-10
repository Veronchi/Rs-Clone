import React, { ChangeEvent, useState } from 'react';
import { Task } from '../../interfaces';

const CardTask = ({ name }: Task): JSX.Element => {
  const [taskTitle, setTaskTitle] = useState<string>(name);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const mouseEnter = ():void => setIsHover(true);
  const mouseLeave = ():void => setIsHover(false);

  const handleClick = (): void => {
    setIsActive(!isActive);
  };

  const handleTitle = (ev: ChangeEvent<HTMLInputElement>): void => {
    setTaskTitle(ev.target.value);
  };

  return (
    <li className="list__item" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      {taskTitle}
      {isHover
        ? (
          <button onClick={handleClick} type="button" className="list__item-btn">
            ...
          </button>
        )
        : null}
      {isActive
        ? <input onChange={handleTitle} placeholder={name} className="list__item-input" type="text" />
        : null}

    </li>
  );
};

export default CardTask;
