import { withUrqlClient } from 'next-urql';
import * as React from 'react'
import { MainFeed } from '../components/home/MainFeed'

const MainFeedView: React.FC<unknown> = (): JSX.Element => {
  return (
    <MainFeed />
  )
}

export default withUrqlClient(() => ({
  url: 'https://server-seven-blue.vercel.app/graphql',
}))(MainFeedView);