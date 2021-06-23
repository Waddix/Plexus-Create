import React, { ReactNode } from 'react';
import { Fragment } from 'react';
import Head from 'next/head';
import Nav from './nav';

interface Props {
  children: ReactNode;
  elementType?: string;
}

function Layout({ children }: Props): JSX.Element {
  return (
    <Fragment>
      <Head>
        <title>Plexus Create</title>
        <meta name="description" content="Create, Connect, Collaborate" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Nav />

      <main>
        {children}
      </main>
    </Fragment >
  );
}
export default Layout;
