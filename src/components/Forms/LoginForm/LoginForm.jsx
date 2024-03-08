import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../../context/auth.context";
import { Button, Form } from "react-bootstrap";

import AuthService from './../../../services/auth.services'

const LoginForm = ({ onSubmit }) => {

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const [errorMessage, setErrorMessage] = useState(undefined)

    const navigate = useNavigate();

    const handleInputChange = e => {
        const { name, value } = e.target
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }))
    }

    const { storeToken, authenticateUser, user } = useContext(AuthContext)

    useEffect(() => {
        user && navigate(`/usuario/${user._id}`)
    }, [user])

    const handleLoginSubmit = (e) => {

        e.preventDefault()

        const { email, password, _id } = userData
        const requestBody = { email, password, _id }

        AuthService
            .loginUser(requestBody)
            .then((response) => {
                storeToken(response.data.authToken)
                authenticateUser()
                onSubmit()
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription)
            })
    }

    return (
        <>
            <Form onSubmit={handleLoginSubmit} className="login-form">
                <Form.Group className="mb-3">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                        value={userData.email}
                        type="email"
                        name="email"
                        placeholder="Introduce correo electrónico"
                        onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        value={userData.password}
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        onChange={handleInputChange} />
                </Form.Group>

                <Button variant="dark" type="submit">
                    Submit
                </Button>
            </Form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
    )
}

export default LoginForm