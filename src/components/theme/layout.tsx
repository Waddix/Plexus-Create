import React, { ReactNode } from 'react';
import { Fragment } from 'react';
import Head from 'next/head';
import Nav from './nav';
import type { AppProps } from 'next/app'
// interface LayoutProps {
//   // react props in typescript
//   // ? === optional
//   children?: React.ReactNode
// }

interface Props {
  children: ReactNode;
  elementType?: string;
}

function Layout({ children }: Props , { pageProps }: AppProps): JSX.Element {
  return (
    <Fragment>
      <Head>
        <title>Plexus Create</title>
        <meta name="description" content="Create, Connect, Collaborate" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Nav {...pageProps} />

      <main>
        {children}
      </main>
    </Fragment >
  );
}
export default Layout;
