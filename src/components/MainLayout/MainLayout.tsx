import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './style.scss';

const MainLayout = (): JSX.Element => {
  const boards = useLocation();

  const gradientStyle = (boards?.state?.background) ? { background: `linear-gradient(to top, ${boards?.state?.background} -25%, #fff)` } : { background: '#fff' };

  return (

    <div className="content" style={gradientStyle}>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>

  );
};

export { MainLayout };
