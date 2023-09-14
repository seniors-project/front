import { atom } from 'recoil';

export const loggedInUserIdState = atom({
  key: 'loggedInUserIdState',
  default: null,
});
