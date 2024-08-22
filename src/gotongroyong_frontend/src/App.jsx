import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import LoggedOut from "./LoggedOut";
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

  return (
    <>
      {isAuthenticated && renderNavbar()}
      <main id="pageContent">
        {isAuthenticated ? <LoggedIn /> : <LoggedOut />}
      </main>
    </>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
