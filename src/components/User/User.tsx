import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  IState,
} from '../../interfaces';
import './style.scss';

const User = (): JSX.Element => {
  const user = useSelector((state: IState) => state.user);
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

  return (
    <div className="user">
      { user.login
        ? (
          <div>
            <button className="user__avatar" type="button" onClick={handleUser}>{user.login[0].toUpperCase()}</button>
            { isUserClick
              ? (
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
              ) : null}
          </div>
        )
        : (
          <div className="user__entry">
            <Link to="/auth" className="user__login">Log in</Link>
          </div>
        )}
    </div>
  );
};

export default User;
