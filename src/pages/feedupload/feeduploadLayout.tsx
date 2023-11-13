import type { ReactNode } from 'react';
import tw from 'twin.macro';

import { Header } from '@/components/Layout/Header';

const Main = tw.main`
  min-h-[500px]
 bg-gray-200
`;

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
