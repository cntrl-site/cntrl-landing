import React, { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import logo from '../../public/cntrl-img.svg';
import { TLayout } from '@cntrl-site/core';
import { LayoutStyle } from '../LayoutStyle/LayoutStyle';
import { getVw } from '../HomePage/HomePage';
import logoIcon from '../../public/icon-large.png';

interface Props {
  layouts: TLayout[];
}

const submitUrl =
  'https://functions.cntrl.site/.netlify/functions/subscribe';

export const SubscribeSection: FC<Props> = ({ layouts }) => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const validateEmail = (email: string): boolean => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };
  const validatePortfolio = (portfolio: string): boolean => {
    return portfolio.length > 2;
  };
  const validate = ({ email, portfolio }: Record<'email' | 'portfolio', string>): boolean => {
    const isValid = validateEmail(email) && validatePortfolio(portfolio);
    setIsValid(isValid || false);
    return isValid;
  };
  const onEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    validate({ email: e.target.value, portfolio });
    setEmail(e.target.value);
  };

  const onPortfolioChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    validate({ portfolio: e.target.value, email });
    setPortfolio(e.target.value);
  };
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (validate({ email, portfolio })) {
      setIsSending(true);
      await fetch(submitUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, portfolio })
      });
    }
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
          <form onSubmit={onSubmit} className="form" autoComplete="off">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Your e-mail"
              onChange={onEmailChange}
              className="input"
            />
            <input
              type="text"
              name="portfolio"
              value={portfolio}
              placeholder="Website / Portfolio"
              onChange={onPortfolioChange}
              className="input"
            />
            <button
              type="submit"
              className="submit"
              disabled={!isValid}
            >
              {isSending ? 'Sending...' : 'Send'}
            </button>
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
          margin-bottom: ${getVw(36, exemplary)}
        }
        .form-bottom-text {
          margin-right: ${getVw(56, exemplary)};
        }
      `}</LayoutStyle>
      <style jsx>{`
        .subscribe-form {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .subscribe-text {
          font-family: 'AeonikPro';
          color: #FFFFFF;
          font-weight: 400;
        }
        .email {
          color: #1EE65B;
          align-self: center;
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
          display: flex;
          align-items: center;
        }
        .strikethrough {
          text-decoration: line-through;
          color: #838383;
        }
        input {
          all: unset;
          color: #fff;
        }
        input:focus::placeholder {
          color: #2d2d2d;
        }
        input::placeholder {
          color: #1EE65B;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
          //transition: background-color 5000s ease-in-out 0s;
          -webkit-text-fill-color: #fff !important;
        }
        .submit {
          background-color: unset;
          border: unset;
          padding: unset;
          cursor: pointer;
          display: inline-flex;
          color: #1EE65B;
        }
        .submit[disabled] {
          color: #2D2D2D;
        }
      `}</style>
    </>
  );
};
