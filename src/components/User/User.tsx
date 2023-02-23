import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  IState,
} from '../../interfaces';
import { addUser } from '../../store/slices/userSlice';
import { getUser } from '../../http/userAPI';
import './style.scss';

const User = (): JSX.Element => {
  const user = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();

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
    getCurrUser();
  }, []);

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
              <a className="user__link" href="/">Help</a>
              <a className="user__link" href="/">Hot keys</a>
            </div>
            <div className="user__exit">
              <button className="user__logout" type="button" onClick={handleLogOut}>Log out</button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default User;
