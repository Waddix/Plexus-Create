/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/post';
import mikroConfig from './db/mikro-orm.config';
import 'reflect-metadata';

const PORT = 8080;

const main = async () => {
  const app = express();

  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        PostResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({
      em: orm.em,
      req,
      res,
    }), // allows us to use express req and res in graphql
  });

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.info(`server started on ${PORT}`);
  });
};

main();
