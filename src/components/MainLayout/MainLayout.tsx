import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './style.scss';

function MainLayout(): JSX.Element {
  return (
    <div className="content">
      <Header />
      <Outlet />
      <Footer />
    </div>

  );
}

export { MainLayout };
