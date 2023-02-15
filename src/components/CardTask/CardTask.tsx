import React, { ChangeEvent, FC, useState } from 'react';
import { ITaskProps } from '../../interfaces';

const CardTask: FC<ITaskProps> = ({ task }): JSX.Element => {
  const [taskTitle, setTaskTitle] = useState<string>(task.text);
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
    <div className="task-item" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      {taskTitle}
      {isHover
        ? (
          <button onClick={handleClick} type="button" className="task-item__btn">
            ...
          </button>
        )
        : null}
      {isActive
        ? <input onChange={handleTitle} placeholder={taskTitle} className="task-item__input" type="text" />
        : null}

    </div>
  );
};

export default CardTask;
