import React, { FC } from 'react';
import { Header } from '../Header/Header';
import { SubscribeSection } from '../SubscribeSection/SubscribeSection';
import { LayoutStyle } from '../LayoutStyle/LayoutStyle';
import { TArticle, TLayout, TPage, TProject } from '@cntrl-site/core';
import { Page } from '@cntrl-site/sdk-nextjs';
import { CntrlClient } from '@cntrl-site/sdk';

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
        id={`homePage-${layouts[1].id}`}
        layouts={layouts}
        layoutId={layouts[1].id}
      >{({ exemplary }) => `
        .button {
          font-size: ${getVw(18, exemplary)};
          border-radius: ${getVw(19, exemplary)};
        }
      `}</LayoutStyle>
      <LayoutStyle
        id={`homePage-${layouts[2].id}`}
        layouts={layouts}
        layoutId={layouts[2].id}
      >{({ exemplary }) => `
        .button {
          font-size: ${getVw(18, exemplary)};
          border-radius: ${getVw(19, exemplary)};
          padding-left: ${getVw(40.5, exemplary)};
          padding-right: ${getVw(40.5, exemplary)};
          padding-top: ${getVw(5, exemplary)}; 
          padding-bottom: ${getVw(5, exemplary)};
          height: ${getVw(38, exemplary)}
        }
      `}</LayoutStyle>
      <style jsx>{`
        .button {
          display: inline-block;
          box-sizing: border-box;
          font-family: 'AeonikPro';
          font-weight: 700;
          border: 2px solid #000;
          cursor: pointer;
          //padding: 3px 40px 5px 40px;
        }
      `}</style>
    </>
  );
};

export function getVw(value: number, exemplary: number) {
  return `${value / exemplary * 100}vw`;
}