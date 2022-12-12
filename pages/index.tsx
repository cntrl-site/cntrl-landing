import type { GetStaticProps, NextPage } from 'next';
import { CntrlClient, TArticle, TProject, TPage } from '@cntrl-site/sdk-nextjs';
import { Redirect } from '../components/Redirect';
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

  return (
    <HomePage
      project={props.project}
      article={props.article}
      page={props.page}
    />
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
