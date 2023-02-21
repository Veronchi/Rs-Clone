import React, {
  ChangeEvent, FC, KeyboardEvent, useState,
} from 'react';
import { Dropdown } from 'react-bootstrap';
import { ITaskProps } from '../../interfaces';
import { TaskEdit } from '../TaskEdit/TaskEdit';
import './style.scss';

const CardTask: FC<ITaskProps> = ({ task }): JSX.Element => {
  const [taskTitle, setTaskTitle] = useState<string>(task.text);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const handleModalClose = (): void => setIsModal(false);

  const mouseEnter = ():void => setIsHover(true);
  const mouseLeave = ():void => setIsHover(false);

  const handleClick = (): void => {
    setIsActive(!isActive);
    setIsModal(true);
  };

  const handleKeyDown = (ev: KeyboardEvent<HTMLInputElement>): void => {
    if (ev.key === 'Enter') {
      setIsActive(!isActive);
    }
  };

  const handleTitle = (ev: ChangeEvent<HTMLInputElement>): void => {
    setTaskTitle(ev.target.value);
  };

  const deleteTask = (id: string): void => {
    console.log(`Удаляем таск с id - ${id}`);
  };

  return (
    <li className="tasks__item" draggable onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <div className="task-header" style={{ backgroundColor: '#ccccff' }}>
        {isHover
          ? (
            <Dropdown>
              <Dropdown.Toggle className="task-header__btn">
                <i className="bx bx-dots-horizontal-rounded bx-xs" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="task-header__menu">
                <Dropdown.Item className="task-header__link" onClick={handleClick}>Edit task</Dropdown.Item>
                <Dropdown.Item className="task-header__link" onClick={(): void => deleteTask(task.id)}> Delete task</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
          : null}
      </div>
      <div className="task-item">
        {taskTitle}
        {isActive
          ? <input onChange={handleTitle} onKeyDown={handleKeyDown} placeholder={taskTitle} className="task-item__input" type="text" />
          : null }
        {isModal
          ? <TaskEdit show={isModal} handleModal={handleModalClose} task={task} /> : null}
      </div>
    </li>
  );
};

export default CardTask;
