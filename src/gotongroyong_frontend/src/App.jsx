import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoggedOut from "./LoggedOut";
import Maps from "./Maps";
import LoggedIn from "./LoggedIn";
import { useAuth, AuthProvider } from "./use-auth-client";

function App() {
  const [result, setResult] = React.useState("");
  const { whoamiActor } = useAuth();
  const isAuthenticated = JSON.parse(sessionStorage.getItem('isAuthenticated'));

  useEffect(() => {
    const getUser = async () => {
      const whoami = await whoamiActor.whoami();
      setResult(whoami);
    };

    getUser();
  }, []);

  const renderAuthenticatedRoute = () => (
    <>
      <Route path="/home" component={LoggedIn} />
      <Route path="/maps" component={Maps} />
    </>
  );

  return (
    <Router>
      <main id="pageContent">
        <Switch>
          <Route exact path="/" component={LoggedOut} />
          {isAuthenticated && renderAuthenticatedRoute()}
        </Switch>
      </main>
    </Router>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
