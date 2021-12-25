import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Box from "@mui/material/Box";

const App: React.FC = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Box>
  );
};

export default App;
