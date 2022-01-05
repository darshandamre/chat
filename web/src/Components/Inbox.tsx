import React from "react";
import Box from "@mui/material/Box";
import PublicIcon from "@mui/icons-material/Public";
import { useMessagesQuery } from "../generated/graphql";
import { getTimestamp } from "../utils/getTimestamp";

interface InboxProps {}

const Inbox: React.FC<InboxProps> = () => {
  const { data, loading } = useMessagesQuery();
  const lastMessage = data?.messages.at(-1);
  const timestamp = lastMessage ? getTimestamp(lastMessage.createdAt) : "";
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
        {loading ? (
          <Box>loading</Box>
        ) : (
          <Box>
            <div>
              Public channel{" "}
              <small>
                {timestamp.length > 10 ? timestamp.slice(-5) : timestamp}
              </small>
            </div>
            <div>
              {lastMessage?.sender.username}: {lastMessage?.message}{" "}
              <small>4</small> {/* placeholder for no. of unread messages */}
            </div>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Inbox;
