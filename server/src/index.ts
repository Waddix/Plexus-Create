/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/post';
import { ProjectResolver } from './resolvers/project';
import {createConnection} from 'typeorm'
import dotenv from 'dotenv'
import { Post } from './db/entities/Post';
import { User } from './db/entities/User';
import { Project } from './db/entities/Project';
import cors from 'cors';
dotenv.config();

const PORT = 8080;

const main = async () => {
  const app = express();
  await createConnection({
    type: 'postgres',
    database: 'plexus',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: true,
    synchronize: true,
    entities: [Post, User, Project]
  });

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }))
  
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        PostResolver,
        ProjectResolver
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({
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
