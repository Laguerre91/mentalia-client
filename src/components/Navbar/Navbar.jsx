import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import "./NavBar.css"
import React from "react"
import { Navbar, Container, Nav, NavDropdown, Button, Offcanvas, Modal } from 'react-bootstrap'
import LoginForm from "../Forms/LoginForm/LoginForm"
import logo from "./../../assets/Mentalia-logo.png"

function NavBar() {

    const { user, isLoggedIn, logout } = useContext(AuthContext)
    const [showOffcanvas, setShowOffcanvas] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const handleOffcanvasClose = () => setShowOffcanvas(false)
    const handleModalClose = () => setShowModal(false)

    return (
        <Navbar expand="md" className="Navbar">
            <Container fluid>
                <Link to={'/'}><img src={logo} alt="Logo de Mentalia" className="logo"></img></Link>
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
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-md"><img src={logo} alt="Logo de Mentalia" /></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">

                            {
                                isLoggedIn && (
                                    <NavDropdown
                                        title={`${user.username}`}
                                        id="offcanvasNavbarDropdown-expand-md"
                                        className="nav-dropdown">
                                        <Link
                                            to={`/usuario/${user._id}`}
                                            onClick={handleOffcanvasClose}
                                            className="nav-link">
                                            Tu página
                                        </Link>
                                        <NavDropdown.Divider />
                                        <Link
                                            to="/psicologos"
                                            onClick={handleOffcanvasClose}
                                            className="nav-link">
                                            Psicólogos
                                        </Link>
                                        <NavDropdown.Divider />
                                        <Link
                                            to="/comunidad"
                                            onClick={handleOffcanvasClose}
                                            className="nav-link">
                                            Comunidad
                                        </Link>
                                    </NavDropdown>
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
                                    <Button
                                        className="navbar-button navbar-button-logout me-3"
                                        variant="dark"
                                        onClick={() => {
                                            logout()
                                            handleOffcanvasClose()
                                        }}>Log out</Button>
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
                            Inicia sesión
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <LoginForm onSubmit={handleModalClose} />
                    </Modal.Body>

                </Modal>

            </Container>
        </Navbar >

    )
}

export default NavBar

