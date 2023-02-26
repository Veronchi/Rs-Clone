/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  ChangeEvent, FC, useState, MouseEvent, FocusEvent,
} from 'react';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { IAvatars, IState, IUpdUserModal } from '../../interfaces';
import { Avatars } from '../../utils/mocData';
import { getUser, update } from '../../http/userAPI';
import { addUser } from '../../store/slices/userSlice';
import './style.scss';

const UserUpdModal: FC<IUpdUserModal> = ({ handleModal }) => {
  const user = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();

  const [login, setLogin] = useState<string>(user.login || '');
  const [email, setEmail] = useState<string>(user.email || '');
  const [isLoginValid, setIsLoginValid] = useState<boolean>(true);
  const [isEmaiValid, setIsEmailValid] = useState<boolean>(true);
  const [avatar, setAvatar] = useState<string>(user.avatar || '');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    if (/^\s+$/.test(value)) {
      setIsLoginValid(false);
    } else {
      setLogin(value);
      setIsLoginValid(true);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    if (/^\s+$/.test(value)) {
      setIsEmailValid(false);
    } else {
      setEmail(value);
      setIsEmailValid(true);
    }
  };

  const handleAvatar = (e: MouseEvent, key: string): void => {
    const li = (e.target as HTMLImageElement).parentElement?.parentElement as HTMLLIElement;
    const list = Array.from(li.parentElement?.children as HTMLCollection);

    setIsChecked(false);

    if (list) {
      list.map((item) => item.classList.remove('active'));
    }

    li.classList.add('active');
    setAvatar(key);
  };

  const handleChecked = (): void => {
    setIsChecked(!isChecked);

    setAvatar('');
  };

  const checkLoginValid = (e: FocusEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    if (!inputValue) {
      setIsLoginValid(false);
    }
  };

  const checkEmailValid = (e: FocusEvent<HTMLInputElement>): void => {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const inputValue = e.target.value;
    const inputArr = inputValue?.split(' ') as Array<string>;
    if (inputValue) {
      setIsEmailValid(true);
      if (EMAIL_REGEXP.test(inputValue)) {
        setIsEmailValid(true);
      } else if (inputArr.length !== 3) {
        setIsEmailValid(false);
      } else if (inputArr.find((str) => str.length < 5)) {
        setIsEmailValid(false);
      } else if (inputArr.includes('')) {
        setIsEmailValid(false);
      }
    } else {
      setIsEmailValid(false);
    }
  };

  const handleSubmit = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();

    if (isLoginValid && isEmaiValid) {
      const isUpdate = await update({
        id: user.id, login, email, avatar,
      });

      if (isUpdate) {
        const data = await getUser();
        dispatch(addUser(data));
      }

      handleModal(e);
    }
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>Update your Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicLogin">
            <Form.Label>Your login</Form.Label>
            <Form.Control
              type="text"
              placeholder="login"
              onChange={handleLoginChange}
              onBlur={checkLoginValid}
              value={login}
            />
            {!isLoginValid ? <span className="validation-text">Enter new login</span> : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your email adress</Form.Label>
            <Form.Control
              type="text"
              placeholder="youremail@mail.com"
              onChange={handleEmailChange}
              onBlur={checkEmailValid}
              value={email}
            />
            {!isEmaiValid ? <span className="validation-text">Enter new email</span> : null}
          </Form.Group>
          <input type="checkbox" id="avatar-chaeck" checked={isChecked} onChange={handleChecked} className="me-1" />
          <label htmlFor="avatar-chaeck">No avatar</label>
        </Form>
        <div className="avatars">
          <h3>pick your avatar</h3>
          <ul className="avatars__list">
            {
              Object.keys(Avatars).map((key) => (
                <li
                  className="avatars__item"
                  key={key}
                  style={isChecked ? { boxShadow: 'none' } : undefined}
                >
                  <button className="avatars__btn" type="button" onClick={(e): void => handleAvatar(e, key)}>
                    <img className="avatars__img" src={Avatars[key as keyof IAvatars]} alt={key} />
                  </button>
                </li>

              ))
            }
          </ul>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Close
        </Button>
        <Button
          type="submit"
          className="success-btn"
          onClick={(e): Promise<void> => handleSubmit(e)}
        >
          Save
        </Button>
      </Modal.Footer>
    </>

  );
};

export default UserUpdModal;
