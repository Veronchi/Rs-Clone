import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const HeaderWelcome = (): JSX.Element => (
  <header className="header__welcome">
    <nav className="header__nav-weelcome">
      <div className="header__logo">
        <img
          className="header__img"
          src="https://img.icons8.com/clouds/256/trello.png"
          alt="trello_logo"
        />
        <h2 className="header__title">Trello Clone</h2>
      </div>
      <div className="header__buttons">
        <Link
          to="/auth"
          state={{ isSignUp: false }}
          className="header__btn"
          type="button"
        >
          Sign In
        </Link>
        <Link
          to="/auth"
          state={{ isSignUp: true }}
          className="header__btn"
          type="button"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  </header>
);

export default HeaderWelcome;
