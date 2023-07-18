import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import { kakaoLogin } from '@/apis/auth';

export default function Callback() {
  const router = useRouter();

  const loginHandler = useCallback(async () => {
    if (!router.query.code) return;

    const response = await kakaoLogin(router.query.code as string);

    localStorage.setItem('token', response.data.accessToken);

    if (response.status === 200) {
      router.replace('/');
    } else {
      router.back();
    }
  }, [router.query]);

  useEffect(() => {
    loginHandler();
  }, [loginHandler]);

  return <></>;
}
