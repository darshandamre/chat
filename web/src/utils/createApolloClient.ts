import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { wsLink } from "./createWebSocketLink";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  // Provide required constructor fields
  link: splitLink,
  cache: new InMemoryCache(),
  credentials: "include"
});
