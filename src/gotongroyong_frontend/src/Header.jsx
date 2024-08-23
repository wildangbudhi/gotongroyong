import React, { useEffect } from "react";
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from "./use-auth-client";
import { gotongroyong_backend } from "../../declarations/gotongroyong_backend";

function Header(props) {
    const [result, setResult] = React.useState("");
    const [balance, setBalance] = React.useState('0');
    const { logout } = useAuth();
    const history = useHistory();

    useEffect(() => {
        const getUser = async () => {
            const whoami = await gotongroyong_backend.whoami();
            const balanceWallet = await gotongroyong_backend.checkBalance(whoami);
            setResult(whoami);
            setBalance(balanceWallet);
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
                        <h6 style={{ marginRight: 20 }}>
                            {`${result} (${balance})`}
                        </h6>
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
