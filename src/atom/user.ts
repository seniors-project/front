import { atom } from 'recoil';

import { ValidateUserResponse } from '@/types/auth';

export const userState = atom<ValidateUserResponse | null>({
  key: 'userState',
  default: null,
});

export const tokenState = atom<string | null>({
  key: 'tokenState',
  default: null,
});
