import type { ReactNode } from 'react';
import tw from 'twin.macro';

import { Header } from './Header';

const Main = tw.main`
  min-h-[500px]
  bg-gray-100
`;

interface Props {
  children: ReactNode;
  token: string;
  profileImg: string;
}

export function Layout({ children, token, profileImg }: Props) {
  return (
    <>
      <Header token={token} profileImg={profileImg} />
      <Main>{children}</Main>
    </>
  );
}
