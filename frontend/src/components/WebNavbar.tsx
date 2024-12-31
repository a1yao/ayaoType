import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Auth } from "./Auth"
import "./WebNavbar.css"

export const WebNavbar = () => {
    const { user } = useUser();

    return (
        <Navbar bg="light" expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/">AyaoType</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {user && <Nav.Link as={Link} to="/profile" className="profile-link">Profile</Nav.Link>}
                        <Auth/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
