import { httpClient } from '@/lib/httpClient';
import { ValidateUserResponse } from '@/types/auth';

export function kakaoLogin(code: string) {
  return httpClient.post('/auth/kakao', { authorizationCode: code });
}

export function userValidate(cookie: string) {
  return httpClient.get<ValidateUserResponse>('/users/validate', {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
}
