import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import {
  // ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
// import { createServer } from "http";
import { WebSocketServer } from "ws";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
// import {
// ConnectionContext,
// SubscriptionServer
// } from "subscriptions-transport-ws";
// import { execute, subscribe } from "graphql";
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
  // const httpServer = createServer(app);

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

  // const subscriptionServer = SubscriptionServer.create({
  //   schema,
  //   execute,
  //   subscribe,
  //   onConnect() {
  //     // lookup userId by token, etc.
  //     // return { userId };
  //   },
  // }, {
  //   server: httpServer,
  //   path: apolloServer.graphqlPath,
  // });

  // const subscriptionServer = SubscriptionServer.create(
  //   {
  //     // This is the `schema` we just created.
  //     schema,
  //     // These are imported from `graphql`.
  //     execute,
  //     subscribe
  //     // Providing `onConnect` is the `SubscriptionServer` equivalent to the
  //     // `context` function in `ApolloServer`. Please [see the docs](https://github.com/apollographql/subscriptions-transport-ws#constructoroptions-socketoptions--socketserver)
  //     // for more information on this hook.
  //     // onConnect: async (
  //     //   connectionParams: Object,
  //     //   webSocket: WebSocket,
  //     //   context: ConnectionContext
  //     // ) => {
  //     //   // If an object is returned here, it will be passed as the `context`
  //     //   // argument to your subscription resolvers.
  //     // }
  //   },
  //   {
  //     // This is the `httpServer` we created in a previous step.
  //     server: httpServer,
  //     // This `server` is the instance returned from `new ApolloServer`.
  //     path: "/graphql"
  //   }
  // );

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    plugins: [
      // ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground()
      // {
      //   async serverWillStart() {
      //     return {
      //       async drainServer() {
      //         subscriptionServer.close();
      //       }
      //     };
      //   }
      // }
    ]
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  // await new Promise<void>(resolve =>
  //   httpServer.listen({ port: 4000 }, resolve)
  // );

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

  // console.log(
  //   `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  // );
};

main().catch(err => {
  console.log(err);
});
