import Head from 'next/head';

import { Layout } from '@/components/Layout';
import NewsFeedHeader from './NewsFeedHeader'
import NewsFeedLayout from './NewsFeedLayout';
import NewsFeedTab from './NewsFeedTab';
import NewsFeedList from './NewsFeedList';

function NewsFeed() {
  return (
    <>
      <Head>
        <title>setting-practice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div style={{
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
        }}>
        <NewsFeedHeader/>
          <NewsFeedTab/>
          <NewsFeedList/>
        </div>
        </Layout>
    </>
  ); 
}

export default NewsFeed;
