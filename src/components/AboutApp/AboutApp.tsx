import React from 'react';
import './style.scss';
import screen1 from '../../assets/img/screen1.png';
import screen2 from '../../assets/img/screen2.png';
import screen3 from '../../assets/img/screen3.png';

const AboutApp = (): JSX.Element => (
  <div className="welcome__app">
    <h2 className="welcome__app-title">About Trello clone</h2>
    <div className="welcome__app-feature">
      <h2 className="welcome__app-second-title">Workflows for projects of any size</h2>
    </div>
    <div className="welcome__app-feature">
      <div className="welcome__app-info">
        <h3 className="feature-title">Create boards to organize your work</h3>
        <p className="feature-description">
          Choose any color and name - it`s up to you to decide how
          your board will look with which you will work
        </p>
      </div>
      <img src={screen1} alt="our_feature_1" className="welcome__app-image" />
    </div>
    <div className="welcome__app-feature">
      <img src={screen2} alt="our_feature_2" className="welcome__app-image" />
      <div className="welcome__app-info">
        <h3 className="feature-title">Create as many columns as you see need.</h3>
        <p className="feature-description">
          Our technologies allow you to create as many columns as you need
          to organize your workflow. You are the owner of your board!
        </p>
      </div>
    </div>
    <div className="welcome__app-feature">
      <div className="welcome__app-info">
        <h3 className="feature-title">Drag and drop your cards!</h3>
        <p className="feature-description">
          Drag and drop your tasks from one column to another,
          conveniently tracking the status of the task
        </p>
      </div>
      <img src={screen3} alt="our_feature_3" className="welcome__app-image" />
    </div>
  </div>
);

export default AboutApp;
