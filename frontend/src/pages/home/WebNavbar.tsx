import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Auth } from "./Auth"

export const WebNavbar = () => {
    const { user } = useUser();

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                </Nav>
                <Nav>
                    {user ? <Nav.Link as={Link} to="/profile">Profile</Nav.Link> : <></>}
                    <Nav.Link><Auth/></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}