import type { ReactNode } from 'react';
import tw from 'twin.macro';

import { Header } from '@/components/Layout/Header';

const Main = tw.main`
  min-h-[500px]
`;

interface Props {
  children: ReactNode;
}

export default function NewsFeedLayout({ children }: Props) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
