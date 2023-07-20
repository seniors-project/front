import { Global, css } from '@emotion/react';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

import { pretenderedRegular } from './fonts';

const customStyles = css({
  body: {
    ...tw`antialiased`,
    ...pretenderedRegular.style,
  },
});

export const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);
