import Head from 'next/head';
import { Flex, Spacer, Box } from '@chakra-ui/react'
import Header from '../components/Header';
import { Nav } from '../components/Nav';
import UserPanel from '../components/home/UserPanel'
import MainFeed from '../components/home/MainFeed'

export default function Home() {
  return (
    <div>
      <Nav />
      <body>
        <h1>Home Feed</h1>
      </body>
        <footer>
        </footer>
    </div>
      )
}



// <Head>
// <title>Plexus Create</title>
// <meta name="description" content="Create, Connect, Collaborate" />
// {/* <link rel="icon" href="/favicon.ico" /> */}
// </Head>

// <main>
// {/* <nav> */}
//   <Header /> */}
// {/* </nav>
// </main>
