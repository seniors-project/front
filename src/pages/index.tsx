import Head from 'next/head';

import { Layout } from '@/components/Layout';

function Home() {
  return (
    <>
      <Head>
        <title>setting-practice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>hi</Layout>
    </>
  );
}

export default Home;
