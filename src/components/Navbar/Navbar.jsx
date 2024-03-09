import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import "./NavBar.css"
import React from "react"
import { Navbar, Container, Nav, NavDropdown, Button, Offcanvas, Modal } from 'react-bootstrap'
import LoginForm from "../Forms/LoginForm/LoginForm"

function NavBar() {

    const { user, isLoggedIn, logout } = useContext(AuthContext)
    const [showOffcanvas, setShowOffcanvas] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const handleOffcanvasClose = () => setShowOffcanvas(false)
    const handleModalClose = () => setShowModal(false)

    return (
        <Navbar expand="md" className="Navbar">
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
                                    <Button variant="dark" onClick={() => {
                                        logout()
                                        handleOffcanvasClose()
                                    }}>Log out</Button>
                                )
                            }

                            {
                                !isLoggedIn && (
                                    <>
                                        <Link
                                            to="/signup"
                                            onClick={handleOffcanvasClose}>

                                            <Button className="navbar-button navbar-button-signup me-4">Registrarse</Button>
                                        </Link>

                                        <Link onClick={handleOffcanvasClose}>

                                            <Button className="navbar-button navbar-button-login me-3" onClick={() => setShowModal(true)}>
                                                Iniciar Sesión
                                            </Button>

                                        </Link>
                                    </>
                                )
                            }

                            {
                                isLoggedIn && (
                                    <NavDropdown title="Páginas" id="offcanvasNavbarDropdown-expand-md">
                                        <Link to={`/usuario/${user._id}`} onClick={handleOffcanvasClose}>Tu página</Link>
                                        <NavDropdown.Divider />
                                        <Link to="/psicologos" onClick={handleOffcanvasClose}>Psicólogos</Link>
                                        <NavDropdown.Divider />
                                        <Link to="/comunidad" onClick={handleOffcanvasClose}>Comunidad</Link>
                                    </NavDropdown>
                                )
                            }
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

                <Modal
                    show={showModal}
                    onHide={handleModalClose}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="model-top-right"
                >
                    <Modal.Header closeButton>

                        <Modal.Title id="contained-modal-title-vcenter">
                            Modal heading
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <h4>Centered Modal</h4>
                        <LoginForm onSubmit={handleModalClose} />
                    </Modal.Body>

                </Modal>

            </Container>
        </Navbar >

    )
}

export default NavBar

