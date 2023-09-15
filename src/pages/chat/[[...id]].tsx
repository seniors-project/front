import tw from 'twin.macro';

import { Layout } from '@/components/Layout';

import ChatList from './chatList';
import ChatRoom from './chatRoom';

function Chat() {
  return (
    <>
      <Layout>
        채팅하기
        <StyledChatContainer>
          <ChatList />
          <ChatRoom />
        </StyledChatContainer>
      </Layout>
    </>
  );
}

export default Chat;

const StyledChatContainer = tw.div`
  flex
  flex-row
  items-center
  justify-center
`;
