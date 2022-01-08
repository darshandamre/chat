import React from "react";
// import PersonIcon from "@mui/icons-material/Person";
import { getTimestamp } from "../utils/getTimestamp";
import { Box } from "@mui/material";

interface MessageProps {
  message: string;
  username: string;
  createdAt: string;
}

const Message: React.FC<MessageProps> = ({ message, createdAt, username }) => {
  return (
    <div style={{ display: "flex", margin: "16px 20px" }}>
      {/* <div>
        <PersonIcon fontSize="large" />
      </div> */}
      <div>
        <div>
          {username} <small>{getTimestamp(createdAt)}</small>
        </div>
        <Box sx={{ whiteSpace: "pre-wrap" }}>{message}</Box>
      </div>
    </div>
  );
};

export default Message;
