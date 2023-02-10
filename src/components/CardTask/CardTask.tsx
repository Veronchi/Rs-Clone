import React, { useState } from 'react';
import { Task } from '../../interfaces';

const CardTask = ({ name }: Task): JSX.Element => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>(name);
  const [isActive, setIsActive] = useState<boolean>(false);

  const mouseEnter = ():void => setIsHover(true);
  const mouseLeave = ():void => setIsHover(false);

  const btnStyles = {
    display: isHover ? 'inline-block' : 'none',
  };

  const inputActive = (): void => {
    setIsActive((prev) => !prev);
  };

  const inputStyles = {
    display: isActive ? 'inline-block' : 'none',
  };

  const handleTitle = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setTaskTitle(ev.target.value);
  };

  return (
    <li className="list__item" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      {taskTitle}
      <button onClick={inputActive} style={btnStyles} type="button" className="list__item-btn">
        ...
      </button>
      <input onChange={handleTitle} style={inputStyles} placeholder={name} className="list__item-input" type="text" />
    </li>
  );
};

export default CardTask;
