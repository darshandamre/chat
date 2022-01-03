import React from "react";
import PersonIcon from "@mui/icons-material/Person";

interface MessageProps {
  message: string;
  username: string;
  createdAt: string;
}

const Message: React.FC<MessageProps> = ({ message, createdAt, username }) => {
  const getTimestamp = () => {
    const now = new Date();
    const timestamp = new Date(Number(createdAt));

    if (
      now.toDateString().slice(4, 16) === timestamp.toDateString().slice(4, 16)
    ) {
      return `today at ${timestamp.toTimeString().slice(0, 5)}`;
    }

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    if (
      yesterday.toDateString().slice(4, 16) ===
      timestamp.toDateString().slice(4, 16)
    ) {
      return `yesterday at ${timestamp.toTimeString().slice(0, 5)}`;
    }

    return `${timestamp.toLocaleDateString()}`;
  };

  return (
    <div style={{ display: "flex", margin: "16px 20px" }}>
      <div>
        <PersonIcon fontSize="large" />
      </div>
      <div>
        <div>
          {username} <small>{getTimestamp()}</small>
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default Message;
