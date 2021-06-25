import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from '@urql/exchange-graphcache';

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:808/graphql',
  fetchOptions: {
    credentials: "include"
  },
  exchanges: [dedupExchange,
     cacheExchange({
       updates:{
         Mutation: {
         
         }
       }
     }), ssrExchange, fetchExchange],
})