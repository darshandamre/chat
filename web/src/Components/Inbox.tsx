import React from "react";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

interface InboxProps {}

const Inbox: React.FC<InboxProps> = () => {
  return (
    <Box
      sx={{
        width: "25%",
        minWidth: "250px",
        backgroundColor: grey[800]
      }}>
      <Box>inbox 1</Box>
      <Box>inbox 2</Box>
      <Box>inbox 3</Box>
    </Box>
  );
};

export default Inbox;
