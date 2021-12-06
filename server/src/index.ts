import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { WebSocketServer } from "ws";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { useServer } from "graphql-ws/lib/use/ws";
import cors from "cors";
import { ChatResolver } from "./resolvers/chat";
import { Chat } from "./entities/Chat";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { COOKIE_NAME, __prod__ } from "./constants";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    database: "chat",
    logging: true,
    synchronize: true,
    entities: [User, Chat]
  });

  const app = express();

  let RedisStore = connectRedis(session);
  let redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3003",
      credentials: true
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        secure: __prod__, // cookie works only in https
        sameSite: "lax"
      },
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET!,
      resave: false
    })
  );

  const schema = await buildSchema({
    resolvers: [HelloResolver, ChatResolver, UserResolver],
    validate: false
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  const server = app.listen(4000, () => {
    // create and use the websocket server
    const wsServer = new WebSocketServer({
      server,
      path: "/graphql"
    });

    useServer({ schema }, wsServer);
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    );
  });
};

main().catch(err => {
  console.log(err);
});
