import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Message from "./Message";

interface ChatsProps {}

const InputMessageField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: grey[800],
      borderRadius: "2rem"
    },
    "&:hover fieldset": {
      borderColor: "#556cd6" //primary.main
    },
    "&.Mui-focused fieldset": {
      borderColor: "#556cd6" //primary.main
    },
    "& textarea": {
      // change padding to change the inner space between border and text in this input field
      paddingLeft: "1em",
      paddingRight: "1em"
    }
  }
});

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
      <InputMessageField
        fullWidth
        placeholder="Message..."
        multiline
        maxRows={5}
      />
    </Box>
  );
};

export default Chats;
