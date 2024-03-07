import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./NavBar.css"
import React from "react";
import { Navbar, Container, Nav, NavDropdown, Form, Button, Offcanvas } from 'react-bootstrap';


function NavBar() {

    const { user, isLoggedIn, logout } = useContext(AuthContext)
    const [showOffcanvas, setShowOffcanvas] = useState(false)

    const handleOffcanvasClose = () => setShowOffcanvas(false)

    return (
        <Navbar expand="md" className="bg-body-tertiary mb-3">
            <Container fluid>
                <Link to={'/'}>MENTALIA</Link>
                <Navbar.Toggle
                    aria-controls="offcanvasNavbar-expand-md"
                    onClick={() => setShowOffcanvas(!showOffcanvas)}
                />
                <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-md"
                    aria-labelledby="offcanvasNavbarLabel-expand-md"
                    placement="end"
                    show={showOffcanvas}
                    onHide={handleOffcanvasClose}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">MENTALIA</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">

                            {
                                isLoggedIn && (
                                    <button onClick={() => { logout(); handleOffcanvasClose(); }}>Log out</button>
                                )
                            }

                            {
                                !isLoggedIn && (
                                    <>
                                        <Link
                                            to="/signup"
                                            onClick={handleOffcanvasClose}>

                                            <button>Sign Up</button>
                                        </Link>

                                        <Link
                                            to="/login"
                                            onClick={handleOffcanvasClose}>

                                            <button>Login</button>

                                        </Link>
                                    </>
                                )
                            }

                            {
                                isLoggedIn && (
                                    <NavDropdown title="Páginas" id="offcanvasNavbarDropdown-expand-md">
                                        <Link to="/usuario/:id" onClick={handleOffcanvasClose}>Tu página</Link>
                                        <NavDropdown.Divider />
                                        <Link to="/psicologos" onClick={handleOffcanvasClose}>Psicólogos</Link>
                                        <NavDropdown.Divider />
                                        <Link to="/comunidad" onClick={handleOffcanvasClose}>Comunidad</Link>
                                    </NavDropdown>
                                )
                            }
                        </Nav>
                        {/* <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar >

    )
}

export default NavBar