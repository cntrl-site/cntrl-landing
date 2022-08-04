import React, { FC, FormEventHandler, useState } from 'react';
import logo from '../../public/cntrl-img.svg';
import { TLayout } from '@cntrl-site/core';
import { LayoutStyle } from '../LayoutStyle/LayoutStyle';
import { getVw } from '../HomePage/HomePage';
import logoIcon from '../../public/icon-large.png';

interface Props {
  layouts: TLayout[];
}

const submitUrl = process.env.NEXT_PUBLIC_AIRTABLE_SUBMIT_URL ||
  'https://glistening-froyo-032078.netlify.app/.netlify/functions/subscribe';

export const SubscribeSection: FC<Props> = ({ layouts }) => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    fetch(submitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      },
      body: JSON.stringify({ email, portfolio })
    });
  };
  return (
    <>
      <div className="subscribe" id="subscribe">
        <div className="subscribe-hero">
          <img src={logo.src} alt="CNTRL Logo" className="hero" />
          <div className="rights">
            CNTRL {year} © All rights reserved
          </div>
        </div>
        <div className="subscribe-form">
          <div className="subscribe-text">
            We’re looking for <span className="strikethrough">investor</span> creative guinea pigs to try our Alpha release.
          </div>
          <form onSubmit={onSubmit} className="form">
            <input
              type="text"
              name="email"
              value="Your e-mail"
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <input
              type="text"
              name="portfolio"
              value="Website / Portfolio"
              onChange={(e) => setPortfolio(e.target.value)}
              className="input"
            />
            <button type="submit" className="submit">Send</button>
          </form>
          <div className="form-bottom-wrapper">
            <a href="mailto:hi@cntrl.site" className="email">hi@cntrl.site</a>
            <div className="form-bottom-text">
              Build in <img src={logoIcon.src} className="icon" />
            </div>
          </div>
        </div>
      </div>
      <LayoutStyle
        id={`subscribe-section-${layouts[2].id}`}
        layouts={layouts}
        layoutId={layouts[2].id}
      >{({exemplary}) => `
         .subscribe {
          min-height: ${getVw(800, exemplary)};
          display: flex;
        }
        .subscribe-hero,
        .subscribe-form {
          flex: 1 0 50%;
        }
        .subscribe-form {
          background-color: #000;
        }
        .subscribe-hero {
         
        }
        .hero {
          width: ${getVw(263, exemplary)};
          margin-top: ${getVw(53, exemplary)};
          margin-left: ${getVw(56, exemplary)}
        }
        .icon {
          width: ${getVw(24, exemplary)};
          margin-left: ${getVw(11, exemplary)};
        }
        .rights {
          margin-left: ${getVw(56, exemplary)};
          margin-bottom: ${getVw(36, exemplary)}
        }
        .subscribe-text {
          font-size: ${getVw(48, exemplary)};
          line-height: ${getVw(60, exemplary)};
          margin-top: ${getVw(53, exemplary)};
          margin-right: ${getVw(159, exemplary)};
          margin-left: ${getVw(40, exemplary)}
        }
        .form {
          margin-top: ${getVw(81, exemplary)};
          margin-left: ${getVw(40, exemplary)};
          margin-right: ${getVw(159, exemplary)};
          font-size: ${getVw(32, exemplary)};
          line-height: ${getVw(40, exemplary)};
        }
        .submit {
          font-size: ${getVw(32, exemplary)};
          line-height: ${getVw(40, exemplary)};
        }
        .email {
          margin-left: ${getVw(40, exemplary)};
        }
        .form-bottom-wrapper {
          margin-top: ${getVw(210, exemplary)};
        }
        .form-bottom-text {
          margin-right: ${getVw(56, exemplary)};
        }
      `}</LayoutStyle>
      <style jsx>{`
        .strikethrough {
          text-decoration: line-through;
          color: #838383;
        }
        .subscribe-text {
          font-family: 'AeonikPro';
          color: #FFFFFF;
          font-weight: 400;
        }
        .email {
          color: #1EE65B;
        }
        .subscribe-hero {
          background-color: #1EE65B;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .form {
          display: flex;
          flex-direction: column;
          color: #1EE65B;
        }
        .form-bottom-wrapper {
          display: flex;
          justify-content: space-between;
        }
        .form-bottom-text {
          color: #FFFFFF;
        }
        input {
          all: unset;
        }
        button {
          background-color: unset;
          border: unset;
          padding: unset;
          display: inline-flex;
          color: #2D2D2D;
        }
      `}</style>
    </>
  );
};
