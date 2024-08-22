import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LoggedOut from "./LoggedOut";
import Maps from "./Maps";
import LoggedIn from "./LoggedIn";
import { useAuth, AuthProvider } from "./use-auth-client";

function App() {
  const { isAuthenticated, identity, logout } = useAuth();

  const renderNavbar = () => (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Gotong Royong</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="/maps">Maps</Nav.Link>
          </Nav>
          <Nav>
            <Button className="ml-auto mr-3" onClick={logout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  const renderAuthenticatedRoute = () => (
    <>
      <Route path="/home" component={LoggedIn} />
      <Route path="/maps" component={Maps} />
    </>
  );

  return (
    <Router>
      {isAuthenticated && renderNavbar()}
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
