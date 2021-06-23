import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import NavBar from '../components/Nav';

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
          <NavBar />
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
