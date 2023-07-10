import Head from 'next/head';

import { Layout } from '@/component/Layout';

function Home() {
  return (
    <>
      <Head>
        <title>setting-practice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
    </>
  );
}

export default Home;
