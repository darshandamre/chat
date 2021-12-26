import React from "react";
import Box from "@mui/material/Box";
import Inbox from "./Inbox";

interface InboxListProps {}

const InboxList: React.FC<InboxListProps> = () => {
  return (
    <Box
      sx={{
        width: "30%",
        minWidth: "230px",
        borderRight: 1,
        borderColor: "grey.800", // keep border color after border right so that it doesn't get overwritten

        // for separate scroll bar
        height: "100%",
        position: "relative",
        overflowY: "auto"
      }}>
      <Box
        sx={{
          // for separate scroll bar
          width: "100%",
          position: "absolute"
        }}>
        <Inbox />
        <Inbox />
        <Inbox />
        <Inbox />
      </Box>
    </Box>
  );
};

export default InboxList;
