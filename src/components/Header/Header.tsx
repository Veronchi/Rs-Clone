import React from 'react';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';
import './style.scss';
import User from '../User/User';

const Header = (): JSX.Element => (
  <header className="header">
    <nav className="header__nav">
      <div className="header__logo">
        <a href="/">
          <img
            className="header__img"
            src="https://img.icons8.com/clouds/256/trello.png"
            alt="trello_logo"
          />
        </a>
        <h1 className="header__title">Trello Clone</h1>
      </div>
      <HeaderMenu />
      <HeaderSearch />
      <User />
    </nav>
  </header>
);

export default Header;
