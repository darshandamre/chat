import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#75cfb8",
      light: "#bbdfc8"
    },
    secondary: {
      main: "#ffc478"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#f0e5d8"
    },
    info: {
      main: "#000000"
    }
  }
});

export default theme;
