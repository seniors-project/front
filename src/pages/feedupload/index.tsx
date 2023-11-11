import Head from 'next/head';

import { Layout } from './feeduploadLayout';
import FeedUploadHead from './feeduploadHeader';
import FeedUploadList from './feeduploadList'

function Home() {
  return (
    <>
      <Head>
        <title>setting-practice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
      <FeedUploadHead/>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
      
      <FeedUploadList/>
       </div>
      </Layout>
    </>
  );
}

export default Home;