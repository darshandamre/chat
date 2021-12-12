import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "secondary.main"
      }}>
      <Link
        href="/"
        underline="none"
        sx={{
          color: "info.main"
        }}>
        <Typography variant="h4">Chat</Typography>
      </Link>

      <Link
        href="/register"
        underline="hover"
        sx={{
          color: "info.main",
          marginLeft: "auto",
          marginRight: "2em",
          alignSelf: "end"
        }}>
        Register
      </Link>
      <Link
        href="/login"
        underline="hover"
        sx={{
          color: "info.main",
          marginRight: "2em",
          alignSelf: "end"
        }}>
        Login
      </Link>
    </Box>
  );
};

export default NavBar;
