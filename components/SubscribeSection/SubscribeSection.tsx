import React, { FC } from 'react';
import logo from '../../public/cntrl-img.svg';
import { TLayout } from '@cntrl-site/core';
import { LayoutStyle } from '../LayoutStyle/LayoutStyle';

interface Props {
  layouts: TLayout[];
}

export const SubscribeSection: FC<Props> = ({ layouts }) => {
  return (
    <>
      <div className="subscribe">
        <div className="subscribe-hero">
          <img src={logo.src} alt="CNTRL Logo" />
        </div>
        <div className="subscribe-form">
          <form>

          </form>
        </div>
      </div>
      <LayoutStyle
        layouts={layouts}
        layoutId={layouts[2].id}
        id={`subscribe-section-${layouts[2].id}`}
      >{`
        .subscribe {
          min-height: 55vw;
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
          background-color: #1EE65B;
        }
      `}</LayoutStyle>
    </>
  );
};
