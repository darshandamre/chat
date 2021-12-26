import React from "react";
import Box from "@mui/material/Box";
import NavBar from "./NavBar";
import InboxList from "./InboxList";
import Chats from "./Chats";

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
        <InboxList />
        <Chats />
      </Box>
    </Box>
  );
};

export default Home;
