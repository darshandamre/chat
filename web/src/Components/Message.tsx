import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { getTimestamp } from "../utils/getTimestamp";

interface MessageProps {
  message: string;
  username: string;
  createdAt: string;
}

const Message: React.FC<MessageProps> = ({ message, createdAt, username }) => {
  return (
    <div style={{ display: "flex", margin: "16px 20px" }}>
      <div>
        <PersonIcon fontSize="large" />
      </div>
      <div>
        <div>
          {username} <small>{getTimestamp(createdAt)}</small>
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default Message;
