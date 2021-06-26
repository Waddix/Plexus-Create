import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const PORT = 8080;

// TODO: Remove dropSchema in Prod!!!
const main = async () => {
  const app = express();
  await createConnection({
    type: "postgres",
    database: "plex-us",
    username: "postgres",
    password: "postgres",
    // logging: true,
    synchronize: true,
    // dropSchema: true,
    entities: [
      __dirname + "/db/entities/*.ts",
      __dirname + "/db/entities/**/*.ts",
    ],
  });

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/resolvers/*.ts"],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }), // allows us to use express req and res in graphql
  });

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, (): void => {
    console.info(`server started on ${PORT}`);
  });
};

main();
