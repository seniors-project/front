import tw from 'twin.macro';

import { Layout } from '@/components/Layout';

import ChatList from './chatList';
import ChatRoom from './chatRoom';

function Chat() {
  return (
    <Layout>
      <StyledChatContainer>
        <StyledChatHeaderWrapper>채팅하기</StyledChatHeaderWrapper>
        <StyledChatWrapper>
          <ChatList />
          <ChatRoom />
        </StyledChatWrapper>
      </StyledChatContainer>
    </Layout>
  );
}

export default Chat;

const StyledChatContainer = tw.div`
  flex
  flex-col	
  mx-auto
  max-w-screen-xl
`;

const StyledChatWrapper = tw.div`
  flex
  mt-8
`;

const StyledChatHeaderWrapper = tw.div`
mt-8
`;
