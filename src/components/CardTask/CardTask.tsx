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
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const handleModalEditClose = (): void => setIsModalEdit(false);

  const mouseEnter = ():void => setIsHover(true);
  const mouseLeave = ():void => setIsHover(false);

  const handleClick = (): void => {
    setIsActive(!isActive);
    setIsModalEdit(true);
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
    <div className="task-item" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      {taskTitle}
      {isHover
        ? (
          <Dropdown>
            <Dropdown.Toggle className="task-item__btn">
              <i className="bx bx-dots-horizontal-rounded bx-xs" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="task-item__menu">
              <Dropdown.Item onClick={handleClick}>Edit task</Dropdown.Item>
              <Dropdown.Item onClick={(): void => deleteTask(task.id)}> Delete task</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : null}
      {isActive
        ? <input onChange={handleTitle} onKeyDown={handleKeyDown} placeholder={taskTitle} className="task-item__input" type="text" />
        : null }
      {isModalEdit
        ? <TaskEdit show={isModalEdit} handleModal={handleModalEditClose} task={task} /> : null}
    </div>
  );
};

export default CardTask;
