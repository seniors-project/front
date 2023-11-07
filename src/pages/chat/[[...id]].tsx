import styled from '@emotion/styled';
import tw from 'twin.macro';

import { Layout } from '@/components/Layout';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import { userValidate } from '@/apis/auth';
import parseCookies from '@/utils/parseCookies';

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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const cookies = parseCookies(context.req.headers.cookie || '');

  const accessToken = cookies.accessToken;

  if (!accessToken) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  try {
    const response = await userValidate(accessToken);
    return {
      props: { user: response.data, token: accessToken },
    };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
};

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
