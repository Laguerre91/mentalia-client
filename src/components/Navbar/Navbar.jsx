import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./NavBar.css"
import React from "react";

import { Navbar, Container, Nav, NavDropdown, Form, Button, Offcanvas } from 'react-bootstrap';


function NavBar() {

    const { user, isLoggedIn, logout } = useContext(AuthContext)

    return (
        <Navbar expand="md" className="bg-body-tertiary mb-3">
            <Container fluid>
                <Navbar.Brand href="/">MENTALIA</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-md"
                    aria-labelledby="offcanvasNavbarLabel-expand-md"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">MENTALIA</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Link href="/login">Loguéate</Link>
                            <Link href="/signup">Registro</Link>
                            <NavDropdown title="Páginas" id="offcanvasNavbarDropdown-expand-md">
                                <NavDropdown.Item href="/usuario/:id">Tu página</NavDropdown.Item>
                                <NavDropdown.Item href="/psicologos">Psicólogos</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/comunidad">Comunidad</NavDropdown.Item>
                            </NavDropdown>
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
        </Navbar>

    )
}

export default NavBar

// {
//     isLoggedIn && (
//         <>
//             <Link to="/projects">
//                 <button>Dashboard</button>
//             </Link>

//             <button onClick={logout}>Logout</button>

//             <p>¡Hola, {user.username}!</p>
//         </>
//     )
// }

// {
//     !isLoggedIn && (
//         <>
//             <Link to="/signup"> <button>Sign Up</button> </Link>
//             <Link to="/login"> <button>Login</button> </Link>
//         </>
//     )
// }