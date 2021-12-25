import React from "react";
import Box from "@mui/material/Box";
import PublicIcon from "@mui/icons-material/Public";

interface InboxProps {}

// TODO: style, inbox api calls

const Inbox: React.FC<InboxProps> = () => {
  return (
    <Box
      sx={{
        width: "25%",
        minWidth: "230px",
        borderRight: 1,
        borderColor: "grey.800" // keep border color after border right so that it doesn't get overwritten
      }}>
      <Box>
        <Box sx={{ display: "flex", borderBottom: 1, borderColor: "grey.800" }}>
          <PublicIcon />
          <Box>
            <div>
              Global chat <span>today</span>
            </div>
            <div>
              sender: message <span>4</span>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Inbox;
