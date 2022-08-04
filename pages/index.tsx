import type { GetStaticProps, NextPage } from 'next'
import { TArticle, TProject, TPage } from '@cntrl-site/core';
import { CntrlClient } from '@cntrl-site/sdk';
import { Page } from '@cntrl-site/sdk-nextjs';
import { Redirect } from '../components/Redirect';
import { SubscribeSection } from '../components/SubscribeSection/SubscribeSection';
import { Header } from '../components/Header/Header';
import { late } from 'zod';
import { LayoutStyle } from '../components/LayoutStyle/LayoutStyle';
import { HomePage } from '../components/HomePage/HomePage';

const client = new CntrlClient(process.env.CNTRL_PROJECT_ID!, process.env.CNTRL_API_URL!);

interface Props {
  project: TProject;
  article?: TArticle;
  page?: TPage;
}

const Index: NextPage<Props> = (props) => {
  if (!props.page || !props.article) {
    return <Redirect />;
  }

  // TODO return already sorted layouts
  const layouts = props.project.layouts.sort((a, b) => a.startsWith - b.startsWith);

  return (
   <HomePage project={props.project} article={props.article} page={props.page} layouts={layouts} />
  );
}

export const getStaticProps: GetStaticProps<any, any> = async () => {
  const project = await client.getProject();
  const page = project.pages.find(page => page.slug === '') || null;
  const article = page ? await client.getPageArticle('') : null;

  return {
    props: {
      project,
      article,
      page
    }
  }
};

export default Index;
