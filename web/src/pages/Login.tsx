import React from "react";
import NavBar from "../Components/NavBar";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  return (
    <>
      <NavBar />
      <div>this is login page</div>
    </>
  );
};

export default Login;
