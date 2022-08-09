import React, { FC } from 'react';
import { LayoutStyle, TLayout } from '@cntrl-site/sdk-nextjs';
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
        .header {
          margin-top: ${getVw(20, exemplary)};
        }
        .button-wrapper {
          margin-right: ${getVw(16, exemplary)};
          margin-bottom: ${getVw(-5, exemplary)};
        }
        .logo {
          height: ${getVw(20, exemplary)};
          margin-left: ${getVw(16, exemplary)};
        }
      `}</LayoutStyle>

      <LayoutStyle
        id={`header-${layouts[1].id}`}
        layouts={layouts}
        layoutId={layouts[1].id}
      >{({ exemplary }) => `
        .header {
          margin-top: ${getVw(20, exemplary)};
        }
        .button-wrapper {
          margin-right: ${getVw(40, exemplary)};
          margin-bottom: ${getVw(-5, exemplary)};
        }
        .logo {
          height: ${getVw(20, exemplary)};
          margin-left: ${getVw(40, exemplary)};
        }
      `}</LayoutStyle>

      <LayoutStyle
        id={`header-${layouts[2].id}`}
        layouts={layouts}
        layoutId={layouts[2].id}
      >{({ exemplary }) => `
        .header {
          margin-top: ${getVw(20, exemplary)};
        }
        .button-wrapper {
          margin-right: ${getVw(40, exemplary)};
          margin-bottom: ${getVw(-5, exemplary)};
        }
        .logo {
          height: ${getVw(20, exemplary)};
          margin-left: ${getVw(40, exemplary)};
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
        .button-wrapper {
          align-self: flex-end;
        }
    `}</style>
    </>
  );
};
