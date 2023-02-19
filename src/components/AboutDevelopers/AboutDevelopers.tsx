import React from 'react';
import './style.scss';

const AboutDevelopers = (): JSX.Element => (
  <div className="welcome__developers">
    <h2 className="welcome__developers-title">Our Developers</h2>
    <div className="welcome__cards">
      <div>
        <h2 className="welcome__cards-name">Alexander</h2>
        <div className="welcome__cards-info">
          <i className="welcome__cards-photo sasha-photo" />
          <p className="welcome__cards-job">Front-End Developer</p>
        </div>
      </div>
      <div>
        <h2 className="welcome__cards-name">Vladimir</h2>
        <div className="welcome__cards-info">
          <i className="welcome__cards-photo vladimir-photo" />
          <p className="welcome__cards-job">Front-End Developer</p>
        </div>
      </div>
      <div>
        <h2 className="welcome__cards-name">Veronica</h2>
        <div className="welcome__cards-info">
          <i className="welcome__cards-photo vika-photo" />
          <p className="welcome__cards-job team-lead">Team Lead</p>
        </div>
      </div>
    </div>
  </div>
);

export default AboutDevelopers;
