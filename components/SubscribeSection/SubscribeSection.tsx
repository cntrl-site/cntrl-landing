import React, { FC, FormEventHandler, useState } from 'react';
import logo from '../../public/cntrl-img.svg';
import { TLayout } from '@cntrl-site/core';
import { LayoutStyle } from '../LayoutStyle/LayoutStyle';
import { getVw } from '../HomePage/HomePage';

interface Props {
  layouts: TLayout[];
}

export const SubscribeSection: FC<Props> = ({ layouts }) => {
  const year = new Date().getFullYear();
  const submitUrl = process.env.NEXT_PUBLIC_AIRTABLE_SUBMIT_URL || '';
  const [email, setEmail] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    fetch(submitUrl, {
      method: 'POST'
    });
  };
  return (
    <>
      <div className="subscribe">
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
          <form onSubmit={onSubmit}>
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" name="portfolio" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} />
            <button type="submit">Send</button>
          </form>
          <a href="mailto:hi@cntrl.site" className="email">hi@cntrl.site</a>
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
        .email {
          margin-left: ${getVw(40, exemplary)};
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
      `}</style>
    </>
  );
};
