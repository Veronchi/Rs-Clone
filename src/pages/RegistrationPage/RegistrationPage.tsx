import React, {
  ChangeEvent, FocusEvent, useEffect, useRef, useState,
} from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { logIn, registration } from '../../http/userAPI';
import './style.scss';

const RegistrationPage = (): JSX.Element => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [inputLogin, setInputLogin] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isLoginValid, setIsLoginValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswdValid, setIsPasswdValid] = useState<boolean>(true);
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
          await registration(inputLogin, inputEmail, inputPassword);
        } else {
          await logIn(inputLogin, inputPassword);
        }
        navigate('/', { replace: true });
      }
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setIsSubmit(false);
    }
    // }
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
    </section>

  );
};

export { RegistrationPage };
