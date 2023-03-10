import { AxiosError } from 'axios';
import React, {
  ChangeEvent, FocusEvent, useContext, useEffect, useRef, useState,
} from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorWindow, getErrorText } from '../../components/ErrorWindow/ErrorWindow';
import { AuthContex } from '../../hoc/AuthProvider';
import { logIn, registration } from '../../http/userAPI';
import './style.scss';

const RegistrationPage = (): JSX.Element => {
  const location = useLocation();
  const { signIn } = useContext(AuthContex);

  const [isSignUp, setIsSignUp] = useState<boolean>(location.state?.isSignUp || false);
  const [inputLogin, setInputLogin] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isLoginValid, setIsLoginValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswdValid, setIsPasswdValid] = useState<boolean>(true);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const targetLogin = useRef(null);
  const targetEmail = useRef(null);
  const targetPasswd = useRef(null);

  const navigate = useNavigate();
  const colorLogin = isLoginValid ? 'green' : 'red';
  const colorEmail = isEmailValid ? 'green' : 'red';
  const colorPasswd = isPasswdValid ? 'green' : 'red';

  const hanleSubmit = async (): Promise<void> => {
    let isValid = false;
    if (isSignUp) {
      isValid = (isLoginValid && isEmailValid && isPasswdValid)
      && (!!inputLogin && !!inputEmail && !!inputPassword);
    } else {
      isValid = (isLoginValid && isPasswdValid)
      && (!!inputLogin && !!inputPassword);
    }
    try {
      if (isValid) {
        if (isSignUp) {
          const data = await registration(inputLogin, inputEmail, inputPassword);
          if (signIn) {
            signIn(!!data, () => navigate('/boards', { replace: true }));
          }
        } else {
          const data = await logIn(inputLogin, inputPassword);
          if (signIn) {
            signIn(!!data, () => navigate('/boards', { replace: true }));
          }
        }
      }
    } catch (e) {
      const err = e as AxiosError;
      setErrorText(getErrorText(err));
      setIsModal(true);
    } finally {
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    if (isSubmit) hanleSubmit();
  }, [isSubmit]);

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

  const checkPasswdValid = (e: FocusEvent<HTMLInputElement>): void => {
    // (?=.*[0-9]) - Assert a string has at least one number;
    // (?=.*[!@#$%^&*]) - Assert a string has at least one special character.
    // {6,16} - Min and max length.
    // const PASSWD_REGEXP = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/; hard passwd
    // const PASSWD_REGEXP = /^[a-zA-Z0-9!@#$%^&*]{3,16}$/; easy passwd
    const PASSWD_REGEXP = /^[a-zA-Z0-9!@#$%^&*]{3,16}$/;
    const inputValue = e.target.value;
    if (inputValue) {
      if (PASSWD_REGEXP.test(inputValue)) {
        setIsPasswdValid(true);
      } else {
        setIsPasswdValid(false);
      }
    } else {
      setIsPasswdValid(false);
    }
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value) setIsLoginValid(true);
    setInputLogin(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value) setIsLoginValid(true);
    setInputEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value) setIsPasswdValid(true);
    setInputPassword(e.target.value);
  };

  const handleModalClose = (): void => setIsModal(false);

  return (
    <section className="registration">
      {isSignUp
        ? <h1 className="registration__title">Create your Account</h1>
        : <h1 className="registration__title">Log in to your Account</h1>}

      <Form className="registration__form">
        <Form.Group className="mb-3" controlId="formGroupLogin">
          {
              !isLoginValid
                ? (
                  <div className="registration__valid">
                    The login cannot be empty!
                  </div>
                ) : null
            }
          <Form.Label>Login</Form.Label>
          <Form.Control
            className="registration__input"
            type="text"
            placeholder="Enter login"
            value={inputLogin}
            onChange={handleLoginChange}
            onBlur={checkLoginValid}
            style={{ borderColor: colorLogin }}
            ref={targetLogin}
          />
        </Form.Group>
        {
          isSignUp
            ? (
              <Form.Group className="mb-3" controlId="formGroupEmail">
                {
                  !isEmailValid
                    ? (
                      <div className="registration__valid">
                        Enter valid e-mail!
                      </div>
                    ) : null
                }
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className="registration__input"
                  type="email"
                  placeholder="Enter email"
                  value={inputEmail}
                  onChange={handleEmailChange}
                  onBlur={checkEmailValid}
                  style={{ borderColor: colorEmail }}
                  ref={targetEmail}
                />
              </Form.Group>
            )
            : null
        }
        <Form.Group className="mb-3" controlId="formGroupPassword">
          {
            !isPasswdValid
              ? (
                <div className="registration__valid">
                  Your password is too simple!
                </div>
              ) : null
          }
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="registration__input"
            type="password"
            placeholder="Password"
            value={inputPassword}
            onChange={handlePasswordChange}
            onBlur={checkPasswdValid}
            style={{ borderColor: colorPasswd }}
            ref={targetPasswd}
          />
        </Form.Group>
        <Button className="registration__btn" type="button" onClick={():void => setIsSubmit(true)}>
          {!isSignUp ? 'Sign in' : 'Sign up'}
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
      <Modal show={isModal} centered>
        <ErrorWindow handleModal={handleModalClose} message={errorText} />
      </Modal>
    </section>
  );
};

export { RegistrationPage };
