import Head from 'next/head';

import { Layout } from '@/components/Layout';

import ChatList from './ChatList';

function chat() {
  return (
    <>
      <Head>
        <title>setting-practice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        채팅하기
        <ChatList></ChatList>
      </Layout>
    </>
  );
}

export default chat;
