import React from 'react';
import { Outlet } from 'react-router-dom';
import './style.scss';

function MainLayout(): JSX.Element {
  return (
    <div className="content">

      <header className="header">
        <h2>header</h2>
      </header>

      <Outlet />

      <footer className="footer">
        <h2>footer</h2>
      </footer>

    </div>

  );
}

export { MainLayout };
