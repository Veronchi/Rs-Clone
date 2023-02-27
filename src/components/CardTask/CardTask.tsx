import React, { FC, useState } from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { remove } from '../../http/rowAPI';
import { ITaskProps } from '../../interfaces';
import { removeTask } from '../../store/slices/tasksSlice';
import { ConfirmModal } from '../TaskEdit/ConfirmModal';
import { TaskEdit } from '../TaskEdit/TaskEdit';
import './style.scss';

const CardTask: FC<ITaskProps> = ({
  task, dragStartHandler, dragLeavetHandler, dragEndHandler, dragOverHandler, dropHandler,
}): JSX.Element => {
  const dispatch = useDispatch();

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isRemove, setIsRemove] = useState<boolean>(false);

  const cover: string | undefined = task.cover || '#E9967A';

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
    <li
      className="tasks__item"
      draggable
      onDragStart={(e): void => dragStartHandler(e, task)}
      onDragLeave={(e): void => dragLeavetHandler(e)}
      onDragEnd={(e): void => dragEndHandler(e)}
      onDragOver={(e): void => dragOverHandler(e)}
      onDrop={(e): void => dropHandler(e, task)}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      style={!task.opacity ? { opacity: '0.4' } : undefined}
    >
      <div className="task-header" style={{ backgroundColor: cover }}>
        {isHover
          ? (
            <Dropdown>
              <Dropdown.Toggle className="task-header__btn">
                <i className="bx bx-dots-horizontal-rounded bx-xs" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="task-header__menu">
                <Dropdown.Item className="task-header__link" onClick={handleClick}>Edit task</Dropdown.Item>
                <Dropdown.Item className="task-header__link" onClick={hanadleDelete}> Delete task</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
          : null}
      </div>
      <div className="task-item">
        {task.text}
      </div>
      <Modal show={isModal} size="lg">
        <TaskEdit handleModal={handleModalClose} task={task} />
      </Modal>
      <Modal show={isRemove} animation={false} centered>
        <ConfirmModal handleModal={handleModel} deleteTask={deleteTask} />
      </Modal>
    </li>
  );
};

export default CardTask;
