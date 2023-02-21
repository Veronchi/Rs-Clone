import React, { FC, useState } from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { remove } from '../../http/rowAPI';
import { ITaskProps } from '../../interfaces';
import { removeTask } from '../../store/slices/tasksSlice';
import { ConfirmModal } from '../TaskEdit/ConfirmModal';
import { TaskEdit } from '../TaskEdit/TaskEdit';
import './style.scss';

const CardTask: FC<ITaskProps> = ({ task }): JSX.Element => {
  const dispatch = useDispatch();

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isRemove, setIsRemove] = useState<boolean>(false);
  const handleModalClose = (): void => setIsModal(false);

  const mouseEnter = ():void => setIsHover(true);
  const mouseLeave = ():void => setIsHover(false);

  const handleClick = (): void => {
    setIsActive(!isActive);
    setIsModal(true);
  };

  const handleModel = (): void => {
    setIsRemove(false);
    setIsModal(false);
  };

  const hanadleDelete = (): void => {
    setIsRemove(true);
  };

  const deleteTask = async (): Promise<void> => {
    const isDelete = await remove(task.id);
    if (isDelete) {
      dispatch(removeTask({
        taskId: task.id,
        columnId: task.ColumnId,
      }));
    }
    setIsRemove(false);
  };

  return (
    <div className="task-item" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      {task.text}
      {isHover
        ? (
          <Dropdown>
            <Dropdown.Toggle className="task-item__btn">
              <i className="bx bx-dots-horizontal-rounded bx-xs" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="task-item__menu">
              <Dropdown.Item className="task-item__link" onClick={handleClick}>Edit task</Dropdown.Item>
              <Dropdown.Item className="task-item__link" onClick={hanadleDelete}> Delete task</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : null}
      {isModal
        ? (
          <Modal show={isModal} size="lg">
            <TaskEdit handleModal={handleModalClose} task={task} />
          </Modal>
        )
        : null}

      {isRemove
        ? (
          <Modal show={isRemove} animation={false} centered>
            <ConfirmModal handleModal={handleModel} deleteTask={deleteTask} />
          </Modal>
        ) : null}
    </div>

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
