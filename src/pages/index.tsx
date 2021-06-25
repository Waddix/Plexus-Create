import { withUrqlClient } from 'next-urql/';
import React from 'react';
import { Fragment } from 'react';
import { usePostsQuery } from '../generated/graphql';

const Home =  () => {
  const [{data}] =  usePostsQuery()
  return (
    <Fragment>
      <h1>Home</h1>
    </Fragment>
  )
}
//_ssrExchange, ctx -> caching
export default withUrqlClient(() => ({
  // ...add your Client options here
  url: 'http://localhost:8080/graphql',
}))(Home);