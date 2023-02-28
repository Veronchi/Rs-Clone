import React from 'react';
import { Link } from 'react-router-dom';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';
import './style.scss';
import User from '../User/User';

const Header = (): JSX.Element => (
  <header className="header">
    <nav className="header__nav">
      <Link to="/boards" className="header__logo">
        <img
          className="header__img"
          src="https://img.icons8.com/clouds/256/trello.png"
          alt="trello_logo"
        />
        <h2 className="header__title">Trello Clone</h2>
      </Link>
      <HeaderMenu />
      <div className="header__right-bar">
        <HeaderSearch />
        <User />
      </div>
    </nav>
  </header>
);

export default Header;
