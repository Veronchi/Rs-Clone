import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn, registration } from '../../http/userAPI';
import { IUser } from '../../interfaces';
import { addUser } from '../../store/slices/userSlice';
import './style.scss';

const RegistrationPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [inputLogin, setInputLogin] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const navigate = useNavigate();

  const hanleSubmit = async (): Promise<void> => {
    try {
      let data;
      if (isSignUp) {
        data = await registration(inputLogin, inputEmail, inputPassword) as IUser;
      } else {
        data = await logIn(inputLogin, inputPassword) as IUser;
      }

      dispatch(addUser(data));
      setIsSubmit(false);
      navigate('/', { replace: true });
    } catch (e) {
      alert((e as Error).message);
    }
  };

  useEffect(() => {
    if (isSubmit) hanleSubmit();
  }, [isSubmit]);

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputLogin(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputPassword(e.target.value);
  };

  return (
    <section className="registration">
      {isSignUp
        ? <h1 className="registration__title">Create your Account</h1>
        : <h1 className="registration__title">Log in to your Account</h1>}

      <Form className="registration__form">
        <Form.Group className="mb-3" controlId="formGroupLogin">
          <Form.Label>Login</Form.Label>
          <Form.Control className="registration__input" type="text" placeholder="Enter login" value={inputLogin} onChange={handleLoginChange} />
        </Form.Group>
        {
          isSignUp
            ? (
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control className="registration__input" type="email" placeholder="Enter email" value={inputEmail} onChange={handleEmailChange} />
              </Form.Group>
            )
            : null
        }
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control className="registration__input" type="password" placeholder="Password" value={inputPassword} onChange={handlePasswordChange} />
        </Form.Group>
        <Button className="registration__btn" type="button" onClick={():void => setIsSubmit(true)}>
          {!isSignUp ? 'Sig in' : 'Sign up'}
        </Button>
        <div>
          {!isSignUp
            ? (
              <span>
                Don&apos;t have an account?
                <button className="registration__option" onClick={():void => setIsSignUp(true)} type="button">Sign up</button>
              </span>
            )
            : (
              <span>
                Already have an account?
                <button className="registration__option" onClick={():void => setIsSignUp(false)} type="button">Sign in</button>
              </span>
            )}
        </div>
      </Form>
    </section>

  );
};

export { RegistrationPage };
