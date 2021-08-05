import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
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
    database: process.env.DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
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

  const apolloServer = await new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/resolvers/*.ts"],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.info(`server started on ${PORT}`);
  });
};

main();
