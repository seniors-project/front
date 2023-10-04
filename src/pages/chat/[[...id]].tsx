import styled from '@emotion/styled';
import tw from 'twin.macro';

import { Layout } from '@/components/Layout';

import ChatList from './chatList';
import ChatRoom from './chatRoom';
import { pretenderedSemiBold } from '@/styles/fonts';

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

const StyledChatHeaderWrapper = styled.div`
  ${tw`mt-8 text-[30px]`}
  font-family: "${pretenderedSemiBold}", sans-serif;
`;
