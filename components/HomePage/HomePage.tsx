import React, { FC } from 'react';
import { CntrlClient, LayoutStyle, Page, TArticle, TLayout, TPage, TProject } from '@cntrl-site/sdk-nextjs';
import { Header } from '../Header/Header';
import { SubscribeSection } from '../SubscribeSection/SubscribeSection';

interface Props {
  project: TProject;
  article: TArticle;
  page: TPage;
  layouts: TLayout[];
}

export const HomePage: FC<Props> = ({ project, article, page, layouts }) => {
  const meta = CntrlClient.getPageMeta(project.meta, page?.meta!);

  const scrollTo = (elId: string) => {
    const el = document.querySelector(`#${elId}`);
    if (!el) return;
    el?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Header layouts={layouts}>
        <a className="button" onClick={() => scrollTo('subscribe')}>Request an invite</a>
      </Header>
      <Page
        project={project}
        article={article}
        meta={meta}
      />
      <SubscribeSection layouts={layouts} />
      <LayoutStyle
        id={`homePage-${layouts[0].id}`}
        layouts={layouts}
        layoutId={layouts[0].id}
      >{({ exemplary }) => `
        .button {
          font-size: ${getVw(18, exemplary)};
          // border-radius: ${getVw(19, exemplary)};
          // padding-left: ${getVw(40.5, exemplary)};
          // padding-right: ${getVw(40.5, exemplary)};
          // padding-top: ${getVw(5, exemplary)}; 
          // padding-bottom: ${getVw(5, exemplary)};
          // height: ${getVw(38, exemplary)}
        }
      `}</LayoutStyle>
      <LayoutStyle
        id={`homePage-${layouts[1].id}`}
        layouts={layouts}
        layoutId={layouts[1].id}
      >{({ exemplary }) => `
        .button {
          font-size: ${getVw(18, exemplary)};
          // border-radius: ${getVw(19, exemplary)};
          // padding-left: ${getVw(40.5, exemplary)};
          // padding-right: ${getVw(40.5, exemplary)};
          // padding-top: ${getVw(5, exemplary)}; 
          // padding-bottom: ${getVw(5, exemplary)};
          // height: ${getVw(38, exemplary)}
        }
      `}</LayoutStyle>
      <LayoutStyle
        id={`homePage-${layouts[2].id}`}
        layouts={layouts}
        layoutId={layouts[2].id}
      >{({ exemplary }) => `
        .button {
          font-size: ${getVw(18, exemplary)};
          // border-radius: ${getVw(19, exemplary)};
          // padding-left: ${getVw(40.5, exemplary)};
          // padding-right: ${getVw(40.5, exemplary)};
          // padding-top: ${getVw(5, exemplary)}; 
          // padding-bottom: ${getVw(5, exemplary)};
          // height: ${getVw(38, exemplary)}
        }
      `}</LayoutStyle>
      <style jsx>{`
        .button {
          display: inline-block;
          box-sizing: border-box;
          font-family: 'input-mono-compressed';
          font-weight: 500;
          letter-spacing: -1px;
          cursor: pointer;
          transition: 0.2s ease-in;
        }
        .button:hover {
          color: #1EE65B;
        }
      `}</style>
    </>
  );
};

export function getVw(value: number, exemplary: number) {
  return `${value / exemplary * 100}vw`;
}
