import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Plexus Create</title>
        <meta name="description" content="Create, Connect, Collaborate" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main>
        <nav>
          <Link href='profile'>Profile</Link>
          <Header />
        </nav>

        <body>
          <h1>Hello World</h1>
        </body>
      </main>

      <footer>
      </footer>
    </div>
  )
}
