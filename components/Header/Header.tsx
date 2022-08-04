import React, { FC } from 'react';
import { LayoutStyle } from '../LayoutStyle/LayoutStyle';
import { TLayout } from '@cntrl-site/core';
import logo from '../../public/cntrl-img.svg';
import { getVw } from '../HomePage/HomePage';

interface Props {
  children?: React.ReactNode;
  layouts: TLayout[];
}

export const Header: FC<Props> = ({ layouts, children }) => {
  return (
    <>
      <div className='header'>
        <img src={logo.src} alt="CNTRL Logo" className='logo'/>
        <div className='button-wrapper'>
          {children}
        </div>
      </div>
      <LayoutStyle
        id={`header-${layouts[0].id}`}
        layouts={layouts}
        layoutId={layouts[0].id}
      >{({ exemplary }) => `
        .button-wrapper {
          border-radius: ${getVw(19, exemplary)}
        }
        .logo {
          height: ${getVw(37, exemplary)}
        }
      `}</LayoutStyle>

      <LayoutStyle
        id={`header-${layouts[1].id}`}
        layouts={layouts}
        layoutId={layouts[1].id}
      >{({ exemplary }) => `
        .button-wrapper {
          margin-right: ${getVw(56, exemplary)};
        }
        .logo {
          height: ${getVw(37, exemplary)};
          margin-left: ${getVw(56, exemplary)};
        }
      `}</LayoutStyle>

      <LayoutStyle
        id={`header-${layouts[2].id}`}
        layouts={layouts}
        layoutId={layouts[2].id}
      >{({ exemplary }) => `
        .header {
          margin-top: ${getVw(61, exemplary)};
        }
        .button-wrapper {
          margin-right: ${getVw(56, exemplary)};
        }
        .logo {
          height: ${getVw(37, exemplary)};
          margin-left: ${getVw(56, exemplary)};
        }
      `}</LayoutStyle>
      <style jsx>{`
        .header {
          z-index: 100;
          position: fixed;
          display: flex;
          width: 100%;
          justify-content: space-between;
        }
    `}</style>
    </>
  );
};
