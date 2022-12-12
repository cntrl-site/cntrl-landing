import type { GetStaticProps, NextPage } from 'next';
import { CntrlClient, TArticle, TProject, TPage, Page } from '@cntrl-site/sdk-nextjs';
import { LayoutsContext } from '../context/LayoutsContext';

const client = new CntrlClient(
  process.env.CNTRL_PROJECT_ID!,
  process.env.CNTRL_API_URL!
);

interface Props {
  article: TArticle;
  project: TProject;
  page: TPage;
}

const CntrlPage: NextPage<Props> = (props) => {
  const meta = CntrlClient.getPageMeta(props.project.meta, props.page.meta!);
  const layouts = props.project.layouts.sort((a, b) => a.startsWith - b.startsWith);
  return (
    <LayoutsContext.Provider value={layouts}>
      <Page
        project={props.project}
        article={props.article}
        meta={meta}
      />
    </LayoutsContext.Provider>
  );
}

type ParamsWithSlug = {
  slug: string;
};

export const getStaticProps: GetStaticProps<any, ParamsWithSlug> = async ({ params }) => {
  if (params?.slug === undefined) {
    throw new Error('Slug is not defined');
  }
  const project = await client.getProject();
  const article = await client.getPageArticle(params.slug);
  const page = project.pages.find(page => page.slug === params.slug);

  return {
    props: {
      project,
      article,
      page
    }
  }
};

export async function getStaticPaths() {
  const res = await client.getProject();

  const paths = res.pages
    .filter(page => page.slug !== '')
    .map((page) => ({
      params: {
        slug: page.slug
      }
    }));

  return { paths, fallback: false };
}

export default CntrlPage;
