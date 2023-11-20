import Head from 'next/head';
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
      <Head>
        <title>SENIORS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
