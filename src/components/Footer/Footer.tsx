import React from 'react';
import './style.scss';

const Footer = (): JSX.Element => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__central-container">&copy; 2023</div>
      <div className="footer__left-container">
        <a
          href="https://github.com/Veronchi"
          target="_blank"
          rel="noreferrer"
        >
          Veronica
        </a>
        <a href="https://github.com/Sanek1n" target="_blank" rel="noreferrer">
          Alexander
        </a>
        <a
          href="https://github.com/Satancrew"
          target="_blank"
          rel="noreferrer"
        >
          Vladimir
        </a>
      </div>
      <div className="footer__right-container">
        <a href="https://rs.school/" target="_blank" rel="noreferrer">
          <img
            className="footer__right-img"
            src="https://rs.school/images/rs_school_js.svg"
            alt="github_logo"
          />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
