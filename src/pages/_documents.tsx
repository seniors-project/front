import React from 'react';
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { extractCritical } from '@emotion/server';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const page = await ctx.renderPage();
    const initialProps = await Document.getInitialProps(ctx);
    const critical = extractCritical(page.html);

    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          {initialProps.styles}
          <style
            data-emotion-css={critical.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: critical.css }}
          />
        </React.Fragment>
      ),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
