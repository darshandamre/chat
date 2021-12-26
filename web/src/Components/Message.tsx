import React from "react";
import PersonIcon from "@mui/icons-material/Person";

interface MessageProps {}

const Message: React.FC<MessageProps> = () => {
  return (
    <div style={{ display: "flex", margin: "16px 20px" }}>
      <div>
        <PersonIcon fontSize="large" />
      </div>
      <div>
        <div>
          username <span>{"<time>"}</span>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          sunt, quibusdam facilis amet veritatis, architecto nesciunt eos quasi
          repellendus autem repudiandae! Nihil quaerat labore delectus.
        </div>
      </div>
    </div>
  );
};

export default Message;
