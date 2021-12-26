import Box from "@mui/material/Box";
import React, { useEffect, useRef } from "react";
import Message from "./Message";

interface ChatsProps {}

const Chats: React.FC<ChatsProps> = () => {
  const chatContainer = useRef<HTMLElement>();

  useEffect(() => {
    if (chatContainer.current) {
      let { scrollHeight } = chatContainer.current.children[0];
      chatContainer.current.scrollTop = scrollHeight;
    }
  }, []);

  return (
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
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </Box>
    </Box>
  );
};

export default Chats;
