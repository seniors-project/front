import Head from 'next/head';

import { Layout } from '@/components/Layout';

import ChatList from './chatList';
import ChatRoom from './chatRoom';

import { useRouter } from 'next/router';

function Chat() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>setting-practice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        채팅하기
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ChatList />
          {id && <ChatRoom />}
        </div>
      </Layout>
    </>
  );
}

export default Chat;
