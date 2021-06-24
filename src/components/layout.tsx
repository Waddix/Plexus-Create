import type { AppProps } from 'next/app'
import React from 'react';
import { Fragment } from 'react';
import Head from 'next/head';
import Nav from './nav';
interface LayoutProps {
  // react props in typescript 
  // ? === optional
children?: React.ReactNode
}

function Layout({ children }: LayoutProps) : JSX.Element {
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
