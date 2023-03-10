import React from 'react';
import './style.scss';
import veronica from '../../assets/img/veronika.jpg';
import vladimir from '../../assets/img/vladimir.jpg';
import alexander from '../../assets/img/alexandr.jpg';

const AboutDevelopers = (): JSX.Element => (
  <div className="welcome__developers">
    <h2 className="welcome__developers-title">Our Developers</h2>
    <div className="welcome__cards">
      <div>
        <h2 className="welcome__cards-name">Alexander</h2>
        <a href="https://github.com/Sanek1n" target="_blank" rel="noreferrer" className="welcome__cards-link">
          <div className="welcome__cards-info">
            <img alt="alexander" src={alexander} className="welcome__cards-photo" />
            <p className="welcome__cards-job">Front-End Developer</p>
          </div>
        </a>
      </div>
      <div>
        <h2 className="welcome__cards-name">Vladimir</h2>
        <a
          href="https://github.com/Satancrew"
          target="_blank"
          rel="noreferrer"
          className="welcome__cards-link"
        >
          <div className="welcome__cards-info">
            <img src={vladimir} alt="vladimir" className="welcome__cards-photo" />
            <p className="welcome__cards-job">Front-End Developer</p>
          </div>
        </a>
      </div>
      <div>
        <h2 className="welcome__cards-name">Veronica</h2>
        <a
          href="https://github.com/Veronchi"
          target="_blank"
          rel="noreferrer"
          className="welcome__cards-link"
        >
          <div className="welcome__cards-info">
            <img src={veronica} alt="veronica" className="welcome__cards-photo" />
            <p className="welcome__cards-job team-lead">Team Lead</p>
          </div>
        </a>
      </div>
    </div>
  </div>
);

export default AboutDevelopers;
