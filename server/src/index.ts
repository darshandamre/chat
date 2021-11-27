import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    database: "chat",
    logging: true,
    synchronize: true,
    entities: [User]
  });

  const app = express();
  const httpServer = createServer(app);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  await new Promise<void>(resolve =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  );
};

main().catch(err => {
  console.log(err);
});
