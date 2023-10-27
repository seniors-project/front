import React, { useLayoutEffect } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

import { ValidateUserResponse } from '@/types/auth';
import { tokenState, userState } from '@/atom/user';
import { httpClient } from '@/lib/httpClient';
import { GlobalStyles } from '@/styles/GlobalStyles';

declare global {
  // Kakao 함수를 전역에서 사용할 수 있도록 선언
  interface Window {
    Kakao: any;
  }
}
interface PageProps {
  user: ValidateUserResponse;
  token: string;
}

function MyApp({ Component, pageProps }: AppProps<PageProps>) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  useLayoutEffect(() => {
    if (!pageProps.token) return;

    const id = httpClient.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${pageProps.token}`;
      return config;
    });

    return () => httpClient.interceptors.request.eject(id);
  }, []); // eslint-disable-line

  function kakaoInit() {
    // 페이지가 로드되면 실행
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    console.log(window.Kakao.isInitialized());
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot
        initializeState={({ set }) => {
          if (pageProps.user) set(userState, pageProps.user);
          if (pageProps.token) set(tokenState, pageProps.token);
        }}>
        <GlobalStyles />
        <Component {...pageProps} />
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          onLoad={kakaoInit}></Script>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
