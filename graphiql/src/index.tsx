import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GraphiQL from "graphiql";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import "graphiql/graphiql.min.css";

const fetcher = createGraphiQLFetcher({
  url: "http://localhost:4000/graphql"
});

ReactDOM.render(
  <GraphiQL fetcher={fetcher} editorTheme={"dracula"} />,
  document.getElementById("graphiql")
);
