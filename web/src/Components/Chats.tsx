import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Message from "./Message";
import InputMessageField from "./InputMessageField";
import { useMessagesQuery } from "../generated/graphql";

interface ChatsProps {}

const Chats: React.FC<ChatsProps> = () => {
  const { data, loading } = useMessagesQuery();

  const chatContainer = useRef<HTMLElement>();

  useEffect(() => {
    if (chatContainer.current) {
      let { scrollHeight } = chatContainer.current.children[0];
      chatContainer.current.scrollTop = scrollHeight;
    }
  });

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column"
      }}>
      <Box
        ref={chatContainer}
        sx={{
          width: "100%",

          // for separate scroll bar
          height: "100%",
          position: "relative",
          overflowY: "auto"
        }}>
        <Box
          sx={{
            width: "100%",

            // for separate scroll bar
            position: "absolute"
          }}>
          {loading ? (
            <div>loading...</div>
          ) : (
            data?.messages.map(
              ({ id, message, createdAt, sender: { username } }) => (
                <Message
                  key={id}
                  message={message}
                  createdAt={createdAt}
                  username={username}
                />
              )
            )
          )}
        </Box>
      </Box>
      <InputMessageField />
    </Box>
  );
};

export default Chats;
