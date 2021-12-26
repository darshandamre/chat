import React from "react";
import Box from "@mui/material/Box";
import PublicIcon from "@mui/icons-material/Public";

interface InboxProps {}

const Inbox: React.FC<InboxProps> = () => {
  return (
    <Box
      sx={{
        pt: 1,
        pb: 1,
        borderBottom: 1,
        borderColor: "grey.800"
      }}>
      <Box sx={{ display: "flex" }}>
        <PublicIcon />
        <Box>
          <div>
            Global chat <span>{"<time>"}</span>
          </div>
          <div>
            sender: last message <span>4</span>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Inbox;
