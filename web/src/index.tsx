import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.querySelector("#root")
);
