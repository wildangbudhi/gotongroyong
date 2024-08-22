import React from "react";
import { useAuth } from "./use-auth-client";
import Form from "./Form";

const whoamiStyles = {
  border: "1px solid #1a1a1a",
  marginBottom: "1rem",
};

function LoggedIn() {
  const [result, setResult] = React.useState("");

  const { whoamiActor, logout } = useAuth();

  const handleClick = async () => {
    const whoami = await whoamiActor.whoami();
    setResult(whoami);
  };

  return (
    <>
      <div className="container">
        <br />
        <h1>Internet Identity Client</h1>
        <h2>You are authenticated!</h2>
        <p>To see how a canister views you, click this button!</p>
        <button id="logout" onClick={logout}>
          log out
        </button>
        <Form />
      </div>
    </>
  );
}

export default LoggedIn;
