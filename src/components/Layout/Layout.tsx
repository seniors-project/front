import type { ReactNode } from 'react';
import tw from 'twin.macro';

import { Header } from './Header';
import { Container } from '@/styles';

const Main = tw.main`
  min-h-[500px]
  // bg-primary-main 
  // border-y-primary-light border-y-[1px]
`;

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Main>
        <Container>{children}</Container>
      </Main>
    </>
  );
}
