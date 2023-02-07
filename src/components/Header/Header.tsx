import React from 'react';
import './Header.scss';
import HeaderSearch from '../HeaderSearch/HeaderSearch';

const Header = (): JSX.Element => (
  <header className="header">
    <nav className="header__nav">
      <div className="header__logo">
        <img
          className="header__img"
          src="https://img.icons8.com/clouds/256/trello.png"
          alt="trello_logo"
        />
        <h1 className="header__title">Trello Clone</h1>
      </div>
      <HeaderSearch />
    </nav>
  </header>
);

export default Header;