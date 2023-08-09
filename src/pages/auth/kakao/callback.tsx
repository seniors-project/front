import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { kakaoLogin } from '@/apis/auth';

const Callback = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  if (!context.query.code)
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
      props: {},
    };

  const response = await kakaoLogin(context.query.code as string);
  const { accessToken, refreshToken } = response.data;

  if (response.status === 200) {
    context.res.setHeader('set-cookie', [
      `accessToken=${accessToken}; path=/;`,
      `refreshToken=${refreshToken}; path=/;`,
    ]);

    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: '/auth/login',
    },
  };
};

export default Callback;
