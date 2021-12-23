import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { client } from "../utils/createApolloClient";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const navigate = useNavigate();
  const { data, loading } = useMeQuery();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();

  let body = null;

  if (loading) {
    //
  } else if (data?.me) {
    body = (
      <>
        <Typography variant="button" component="div" sx={{ mr: 2 }}>
          {data.me.username}
        </Typography>
        <LoadingButton
          loading={logoutFetching}
          color="inherit"
          onClick={async () => {
            await logout();
            await client.resetStore();
          }}>
          Logout
        </LoadingButton>
      </>
    );
  } else {
    body = (
      <>
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
      </>
    );
  }

  return (
    <Box>
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
          {body}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
