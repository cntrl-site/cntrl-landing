import React, { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import logo from '../../public/cntrl-green.svg';
import { TLayout } from '@cntrl-site/core';
import { LayoutStyle } from '../LayoutStyle/LayoutStyle';
import { getVw } from '../HomePage/HomePage';
import logoIcon from '../../public/icon-large.png';

interface Props {
  layouts: TLayout[];
}

const submitUrl = process.env.NEXT_PUBLIC_AIRTABLE_SUBMIT_URL!;

export const SubscribeSection: FC<Props> = ({ layouts }) => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSubmit, setIsSubmited] = useState(false);

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
      setIsSending(false);
      setIsSubmited(true);
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
            We’re looking for <span className="strikethrough">investors</span> creative guinea pigs to try our Alpha release.
          </div>
          {isSubmit
            ?
            <div className="submitted">
              Nice. Look for a white dove to deliver your invite.
            </div>
            :
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
          }
          <div className="form-bottom-wrapper">
            <a href="mailto:hi@cntrl.site" className="email">hi@cntrl.site</a>
            <div className="form-bottom-text">
              Built in <img src={logoIcon.src} className="icon" />
            </div>
          </div>
        </div>
      </div>
      <LayoutStyle
        id={`subscribe-section-${layouts[0].id}`}
        layouts={layouts}
        layoutId={layouts[0].id}
      >{({exemplary}) => `
        .subscribe {
          flex-direction: column-reverse;
          justify-content: space-between;
          position: relative;
          height: 100vh
        }
        .subscribe-hero {
          padding-left: ${getVw(16, exemplary)}
        } 
        .subscribe-form {
          flex: 1 auto;
        }
        .subscribe-text {
          font-size: ${getVw(48, exemplary)};
          margin-top: ${getVw(41, exemplary)};
          padding-left: ${getVw(16, exemplary)}
        } 
        .hero {
          width: ${getVw(385, exemplary)};
        }
        .rights {
          margin-bottom: ${getVw(27, exemplary)};
          margin-top: ${getVw(17, exemplary)}
        }
        .email {
          padding-left: ${getVw(16, exemplary)};
          bottom: ${getVw(157, exemplary)};
          position: absolute;
        }
        .icon {
          width: ${getVw(24, exemplary)};
          margin-left: ${getVw(11, exemplary)};
        }
        .form-bottom-text {
          bottom: ${getVw(25, exemplary)};
          right: ${getVw(14, exemplary)};
          position: absolute;
        } 
        .form {
          // margin-top: ${getVw(180, exemplary)};
          // margin-bottom: ${getVw(112, exemplary)};
          margin-right: ${getVw(14, exemplary)};
          padding-left: ${getVw(16, exemplary)}
        }
        .input {
          font-size: ${getVw(32, exemplary)};
          border-width: ${getVw(1, exemplary)};
          padding-bottom: ${getVw(7.5, exemplary)}!important;
          padding-top: ${getVw(7.5, exemplary)}!important;
        }
        .submit {
          font-size: ${getVw(32, exemplary)};
          padding-top: ${getVw(7.5, exemplary)}!important;
        }
        .submitted {
          font-size: ${getVw(32, exemplary)};
          line-height: ${getVw(40, exemplary)};
          margin-right: ${getVw(14, exemplary)};
          margin-left: ${getVw(16, exemplary)};
        }
      `}
      </LayoutStyle>
      <LayoutStyle
        id={`subscribe-section-${layouts[1].id}`}
        layouts={layouts}
        layoutId={layouts[1].id}
      >{({exemplary}) => `
        .subscribe {
          min-height: ${getVw(800, exemplary)};
        }
        .subscribe-hero,
        .subscribe-form {
          flex: 1 1 50%;
        }
        .hero {
          width: ${getVw(183, exemplary)};
          margin-top: ${getVw(53, exemplary)};
          margin-left: ${getVw(16, exemplary)}
        }
        .icon {
          width: ${getVw(24, exemplary)};
          margin-left: ${getVw(11, exemplary)};
        }
        .rights {
          margin-left: ${getVw(16, exemplary)};
          margin-bottom: ${getVw(36, exemplary)}
        }
        .subscribe-text {
          font-size: ${getVw(40, exemplary)};
          line-height: ${getVw(50, exemplary)};
          margin-top: ${getVw(53, exemplary)};
          margin-right: ${getVw(20, exemplary)};
          margin-left: ${getVw(20, exemplary)}
        }
        .form {
          margin-top: ${getVw(81, exemplary)};
          margin-left: ${getVw(20, exemplary)};
          margin-right: ${getVw(20, exemplary)};
          font-size: ${getVw(32, exemplary)};
          line-height: ${getVw(40, exemplary)};
        }
        .submit {
          font-size: ${getVw(28, exemplary)};
          line-height: ${getVw(35, exemplary)};
          padding-top: ${getVw(7.5, exemplary)}!important;
        }
        .email {
          margin-left: ${getVw(20, exemplary)};
        }
        .form-bottom-wrapper {
          margin-top: ${getVw(210, exemplary)};
          margin-bottom: ${getVw(36, exemplary)}
        }
        .form-bottom-text {
          margin-right: ${getVw(20, exemplary)};
        }
        .input {
          font-size: ${getVw(32, exemplary)};
          padding-bottom: ${getVw(7.5, exemplary)}!important;
          padding-top: ${getVw(7.5, exemplary)}!important;
          border-width: ${getVw(2, exemplary)};
        }
        .submitted {
          font-size: ${getVw(32, exemplary)};
          line-height: ${getVw(40, exemplary)};
          margin-right: ${getVw(20, exemplary)};
          margin-left: ${getVw(20, exemplary)};
        }
      `}</LayoutStyle>
      <LayoutStyle
        id={`subscribe-section-${layouts[2].id}`}
        layouts={layouts}
        layoutId={layouts[2].id}
      >{({exemplary}) => `
        .subscribe {
          min-height: ${getVw(800, exemplary)};
        }
        .subscribe-hero,
        .subscribe-form {
          flex: 1 0 50%;
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
          padding-top: ${getVw(7.5, exemplary)}!important;
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
        .input {
          font-size: ${getVw(32, exemplary)};
          padding-bottom: ${getVw(11.5, exemplary)}!important;
          padding-top: ${getVw(7.5, exemplary)}!important;
          border-width: ${getVw(2, exemplary)};
        }
        .submitted {
          font-size: ${getVw(32, exemplary)};
          line-height: ${getVw(40, exemplary)};
          margin-right: ${getVw(159, exemplary)};
          margin-left: ${getVw(40, exemplary)};
        }
      `}</LayoutStyle>
      <style jsx>{`
        .subscribe {
          display: flex;
          background-color: #000;
        }
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
        .rights {
          color: #1EE65B;
        }
        .email {
          color: #1EE65B;
          align-self: center;
        }
        .subscribe-hero {
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
          outline: none;
          border-radius: unset;
          border-top-width: 0; 
          border-left-width: 0; 
          border-right-width: 0;
          border-color: #1EE65B;
          border-style: solid;
          background-color: transparent;
          -webkit-appearance: none;
          color: #fff;
          padding-left: 0;
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
          color: #1EE65B;
          display: block;
          align-self: flex-start;
        }
        .submit[disabled] {
          color: #2D2D2D;
        }
        .submitted {
          color: #1EE65B;
        }
      `}</style>
    </>
  );
};
