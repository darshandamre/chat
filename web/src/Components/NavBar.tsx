import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ cursor: "pointer", mr: "auto" }}
            onClick={() => {
              navigate("/");
            }}>
            Chat
          </Typography>
          <Button
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate("/register");
            }}>
            Signup
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/login");
            }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
