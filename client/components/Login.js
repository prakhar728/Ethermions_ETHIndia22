import React from "react";
import { connectionButton } from "./Header.data";

const Login = () => {
  return (
    <div className="loginContainer">
      <h1>Please Connect your Wallet</h1>
      {connectionButton()}
    </div>
  );
};

export default Login;
