import Head from 'next/head';

import { Layout } from '@/components/Layout';

import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

function chat() {
  return (
    <>
      <Head>
        <title>setting-practice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        채팅하기
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'center', 
          alignItems: 'center',
        }}>          
          <ChatList />
          <ChatRoom/>
        </div> 
      </Layout>
    </>
  );
}

export default chat;
