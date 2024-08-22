import React from "react";
import { useAuth } from "./use-auth-client";

function LoggedOut(props) {
  const { login } = useAuth();

  const handleClick = async () => {
    await login();
    props.history.replace('/home');
  };

  return (
    <div className="container">
      <h1>Internet Identity Client</h1>
      <h2>You are not authenticated</h2>
      <p>To log in, click this button!</p>
      <button type="button" id="loginButton" onClick={handleClick}>
        Log in
      </button>
    </div>
  );
}

export default LoggedOut;
