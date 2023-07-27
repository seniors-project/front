import type { ReactNode } from 'react';
import tw from 'twin.macro';

import { Header } from './Header';

const Main = tw.main`
  min-h-[500px]
  bg-gray-100
`;

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
