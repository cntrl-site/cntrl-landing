import React, { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { LayoutStyle } from '@cntrl-site/sdk-nextjs';
import { getVw } from './HomePage/HomePage';
import { useLayouts } from '../context/useLayouts';

const submitUrl = process.env.NEXT_PUBLIC_AIRTABLE_SUBMIT_URL!;

enum SubmitStatus {
  Idle = 'idle',
  InProgress = 'in-progress',
  Finished = 'finished'
}

export const SubscribeForm: FC = () => {
  const layouts = useLayouts();
  const [email, setEmail] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(SubmitStatus.Idle);

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
      setSubmitStatus(SubmitStatus.InProgress);
      await fetch(submitUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, portfolio })
      });
      setSubmitStatus(SubmitStatus.Finished);
    }
  };
  return (
    <>
      <div id="subscribe">
        <div className="subscribe-form">
          {submitStatus === SubmitStatus.Finished
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
                disabled={!isValid || submitStatus === SubmitStatus.InProgress}
              >
                {submitStatus === SubmitStatus.InProgress ? 'Sending...' : 'Send'}
              </button>
            </form>
          }
        </div>
      </div>
      <LayoutStyle
        id={`subscribe-section-${layouts[0].id}`}
        layouts={layouts}
        layoutId={layouts[0].id}
      >{({exemplary}) => `
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
        }
      `}
      </LayoutStyle>
      <LayoutStyle
        id={`subscribe-section-${layouts[1].id}`}
        layouts={layouts}
        layoutId={layouts[1].id}
      >{({exemplary}) => `
        .form {
          font-size: ${getVw(32, exemplary)};
          line-height: ${getVw(40, exemplary)};
        }
        .submit {
          font-size: ${getVw(28, exemplary)};
          line-height: ${getVw(35, exemplary)};
          padding-top: ${getVw(7.5, exemplary)}!important;
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
        }
      `}</LayoutStyle>
      <LayoutStyle
        id={`subscribe-section-${layouts[2].id}`}
        layouts={layouts}
        layoutId={layouts[2].id}
      >{({exemplary}) => `
        .form {
          font-size: ${getVw(32, exemplary)};
          line-height: ${getVw(40, exemplary)};
        }
        .submit {
          font-size: ${getVw(32, exemplary)};
          line-height: ${getVw(40, exemplary)};
          padding-top: ${getVw(7.5, exemplary)}!important;
        }
        .form-bottom-wrapper {
          margin-top: ${getVw(210, exemplary)};
          margin-bottom: ${getVw(33, exemplary)}
        }
        .input {
          font-size: ${getVw(32, exemplary)};
          padding-bottom: ${getVw(11.5, exemplary)}!important;
          padding-top: ${getVw(9.5, exemplary)}!important;
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
        .form {
          display: flex;
          flex-direction: column;
          color: #1EE65B;
        }
        .form-bottom-wrapper {
          display: flex;
          justify-content: space-between;
        }
        input {
          font-family: 'AeonikPro';
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
        input:-webkit-autofill:active {
          -webkit-text-fill-color: #fff !important;
        }
        .submit {
          font-family: 'AeonikPro';
          font-weight: 400;
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
