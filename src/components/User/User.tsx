import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import {
  IState,
} from '../../interfaces';
import { addUser } from '../../store/slices/userSlice';
import { getUser } from '../../http/userAPI';
import './style.scss';
import { HotkeyWindow } from '../HotkeyWindow/HotkeyWindow';

const User = (): JSX.Element => {
  const user = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isUserClick, setIsUserClick] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleUser = (): void => {
    setIsUserClick(true);
  };

  const handleClose = (): void => {
    setIsUserClick(false);
  };

  const handleLogOut = (): void => {
    setIsUserClick(false);
    localStorage.removeItem('token');
    navigate('/welcome', { replace: true });
  };

  const getCurrUser = async (): Promise<void> => {
    const data = await getUser();
    dispatch(addUser(data));
  };

  useEffect(() => {
    getCurrUser()
      .catch((e: AxiosError) => {
        if (e.response?.status === 401) {
          navigate('/welcome', { replace: true });
        }
      });
  }, []);

  const handleModalClose = (): void => {
    setIsModal(false);
  };

  const handleHotKey = (): void => {
    setIsModal(true);
    handleClose();
  };

  return (
    <div className="user">
      <div>
        <button className="user__avatar" type="button" onClick={handleUser}>{user.login[0]?.toUpperCase()}</button>
        <Modal
          show={isUserClick}
          backdropClassName="user-modal"
          onHide={handleClose}
          className="user__block"
        >
          <div className="user__info">
            <div className="user__data">
              <h4 className="user__title">Account</h4>
              <p className="user__label">Name:</p>
              <p className="user__name">{user.login}</p>
              <p className="user__label">Email address:</p>
              <p className="user__email">{user.email}</p>
            </div>
            <div className="user__links">
              <button className="user__link" type="button" onClick={handleHotKey}>Hot key</button>
            </div>
            <div className="user__exit">
              <button className="user__logout" type="button" onClick={handleLogOut}>Log out</button>
            </div>
          </div>
        </Modal>
      </div>
      <Modal show={isModal}>
        <HotkeyWindow
          handleModal={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default User;
