import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GraphiQL from "graphiql";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import "graphiql/graphiql.min.css";

const url = "http://localhost:4000/graphql";

const subscriptionUrl = "ws://localhost:4000/graphql";

const fetcher = createGraphiQLFetcher({
  url,
  subscriptionUrl
});

ReactDOM.render(
  <GraphiQL fetcher={fetcher} editorTheme={"dracula"} />,
  document.getElementById("graphiql")
);
