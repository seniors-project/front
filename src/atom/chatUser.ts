import { atom } from 'recoil';

export const loggedInUserIdState = atom<number | null>({
  key: 'loggedInUserIdState',
  default: null,
});
