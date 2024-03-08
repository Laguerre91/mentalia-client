import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import AuthService from './../../../services/auth.services'

const SignupForm = () => {

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleInputChange = e => {
        const { name, value } = e.target
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }))
    }

    const handleSignupSubmit = (e) => {

        e.preventDefault();

        const { email, password, username } = userData
        const requestBody = { email, password, username };

        AuthService
            .signUpUser(requestBody)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }

    return (
        <div className="SignupForm">
            <Form onSubmit={handleSignupSubmit}>

                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Ingresa tu email"
                        value={userData.email}
                        onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Ingresa tu contraseña"
                        value={userData.password}
                        onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Elige tu nombre de usuario"
                        value={userData.username}
                        onChange={handleInputChange} />
                </Form.Group>

                <Button variant="warning" type="submit">Crear usuario</Button>
            </Form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    )
}

export default SignupForm