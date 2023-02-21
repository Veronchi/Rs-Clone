import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './style.scss';

const MainLayout = (): JSX.Element => (
  <div className="content">
    <Header />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </div>

);

export { MainLayout };
