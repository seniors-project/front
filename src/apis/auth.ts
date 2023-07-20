import { httpClient } from '@/lib/httpClient';

export function kakaoLogin(code: string) {
  return httpClient.post('/auth/kakao', { authorizationCode: code });
}
