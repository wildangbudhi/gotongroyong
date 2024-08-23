import React, { useEffect } from "react";
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from "./use-auth-client";

function Header(props) {
    const [result, setResult] = React.useState("");
    const { logout, whoamiActor } = useAuth();
    const history = useHistory();

    useEffect(() => {
        const getUser = async () => {
            const whoami = await whoamiActor.whoami();
            setResult(whoami);
        };

        getUser();
    }, []);

    const handleLogout = async () => {
        await logout();
        history.replace('/');
    }

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Gotong Royong</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/maps">Maps</Nav.Link>
                    </Nav>
                    <Nav>
                        <Button className="ml-auto mr-3" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
