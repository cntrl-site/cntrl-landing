import React, { FC } from 'react';
import { CntrlClient, LayoutStyle, Page, TArticle, TPage, TProject } from '@cntrl-site/sdk-nextjs';
import { Header } from '../Header/Header';
import { useLayouts } from '../../context/useLayouts';

interface Props {
  project: TProject;
  article: TArticle;
  page: TPage;
}

export const HomePage: FC<Props> = ({ project, article, page }) => {
  const meta = CntrlClient.getPageMeta(project.meta, page?.meta!);
  const layouts = useLayouts();

  const scrollTo = (elId: string) => {
    const el = document.querySelector(`#${elId}`);
    if (!el) return;
    el?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Header>
        <a className="button" onClick={() => scrollTo('subscribe')}>Request an invite</a>
      </Header>
      <Page
        project={project}
        article={article}
        meta={meta}
      />
      <LayoutStyle
        id={`homePage-${layouts[0].id}`}
        layouts={layouts}
        layoutId={layouts[0].id}
      >{({ exemplary }) => `
        .button {
          font-size: ${getVw(18, exemplary)};
        }
      `}</LayoutStyle>
      <LayoutStyle
        id={`homePage-${layouts[1].id}`}
        layouts={layouts}
        layoutId={layouts[1].id}
      >{({ exemplary }) => `
        .button {
          font-size: ${getVw(18, exemplary)};
        }
      `}</LayoutStyle>
      <LayoutStyle
        id={`homePage-${layouts[2].id}`}
        layouts={layouts}
        layoutId={layouts[2].id}
      >{({ exemplary }) => `
        .button {
          font-size: ${getVw(18, exemplary)};
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
