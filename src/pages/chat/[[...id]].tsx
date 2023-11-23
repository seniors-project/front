import tw from 'twin.macro';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layout';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import { userValidate } from '@/apis/auth';
import parseCookies from '@/utils/parseCookies';

import ChatList from './chatList';
import ChatRoom from './chatRoom';

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
  mt-8 text-[30px] font-semibold
`;

function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const checkScreenWidth = () => {
    setIsSmallScreen(window.innerWidth < 768);
  };

  useEffect(() => {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);

  // Conditional rendering based on screen size and id presence
  const renderContent = () => {
    if (isSmallScreen) {
      return id ? <ChatRoom /> : <ChatList />;
    }
    return (
      <>
        <ChatList />
        <ChatRoom />
      </>
    );
  };

  return (
    <Layout>
      <StyledChatContainer>
        <StyledChatHeaderWrapper>채팅하기</StyledChatHeaderWrapper>
        <StyledChatWrapper>{renderContent()}</StyledChatWrapper>
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
