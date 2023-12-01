import Head from 'next/head';

import Layout from './feeduploadLayout';
import FeedUploadHead from './feeduploadHeader';
import FeedUploadList from './feeduploadList';

import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import parseCookies from '@/utils/parseCookies';
import { userValidate } from '@/apis/auth';

function Home() {
  return (
    <>
      <Head>
        <title>setting-practice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <FeedUploadHead />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FeedUploadList />
        </div>
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
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
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
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
};

export default Home;
