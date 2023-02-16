import React from 'react';
import { Outlet } from 'react-router-dom';
import { Aside } from '../Aside/aside';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './style.scss';

const MainLayout = (): JSX.Element => (
  <div className="content">
    <Header />
    <main className="main">
      <Aside />
      <Outlet />
    </main>
    <Footer />
  </div>

);

export { MainLayout };
