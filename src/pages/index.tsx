import { withUrqlClient } from 'next-urql/';
import React from 'react';
import { Fragment } from 'react';

const Home = () => {
  return (
    <Fragment>
      <h1>Home</h1>
    </Fragment>
  )
}
export default withUrqlClient((_ssrExchange, ctx) => ({
  // ...add your Client options here
  url: 'http://localhost:8080/graphql',
}))(Home);