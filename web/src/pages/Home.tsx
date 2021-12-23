import React from "react";
import Box from "@mui/material/Box";
import Inbox from "../Components/Inbox";
import NavBar from "../Components/NavBar";

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh"
      }}>
      <NavBar />
      <Box sx={{ flexGrow: 1, display: "flex" }}>
        <Inbox />
      </Box>
    </Box>
  );
};

export default Home;
