import React, { useState } from 'react';
import AboutApp from '../../components/AboutApp/AboutApp';
import AboutDevelopers from '../../components/AboutDevelopers/AboutDevelopers';
import Footer from '../../components/Footer/Footer';
import HeaderWelcome from '../../components/HeaderWelcome/HeaderWelcome';

import './style.scss';

const WelcomePage = (): JSX.Element => {
  const [isAboutDevelopers, setIsAboutDevelopers] = useState<boolean>(false);
  return (
    <div className="page-container">
      <HeaderWelcome />
      <section className="welcome">
        <div className="welcome__content">
          <div className="welcome__info-block">
            <h1 className="welcome__title">Trello clone</h1>
            <p className="welcome__small-text">
              Trello clone - an application that will help you and your team
              organize your workflow, achieving your goals!
            </p>
            <p className="welcome__small-text">
              Use our application as a Source of Performance Improvement
            </p>
            <p className="welcome__small-text">
              Easy-to-learn and use boards, columns and cards provide a
              comprehensive overview of who is doing what and what needs to be done.
            </p>
          </div>
          <img src="../static/media/ourlogo.9200bdfbbdc815b503b7.png" alt="our_logo" className="welcome__image" />
        </div>
        <div className="welcome__links">
          <button
            type="button"
            className="welcome__buttons"
            onClick={(): void => setIsAboutDevelopers(true)}
          >
            About Us
          </button>
          <button
            type="button"
            className="welcome__buttons"
            onClick={(): void => setIsAboutDevelopers(false)}
          >
            About App
          </button>
        </div>
        {isAboutDevelopers ? <AboutDevelopers /> : <AboutApp />}
      </section>
      <Footer />
    </div>
  );
};

export default WelcomePage;
