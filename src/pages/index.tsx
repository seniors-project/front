import { GetServerSidePropsContext, GetServerSideProps } from 'next';

import { Layout } from '@/components/Layout';
import { userValidate } from '@/apis/auth';
import parseCookies from '@/utils/parseCookies';

import NewsFeed from './newsfeed';

function Home() {
  return (
    <>
      <Layout>
        <NewsFeed />
      </Layout>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const cookies = parseCookies(context.req.headers.cookie || '');

  const accessToken = cookies.accessToken;

  if (!accessToken) {
    return {
      props: { user: null, token: null },
    };
  }

  try {
    const response = await userValidate(accessToken);
    return {
      props: { user: response.data, token: accessToken },
    };
  } catch (e) {
    console.log(e);
    return {
      props: { user: null, token: null },
    };
  }
};

export default Home;
