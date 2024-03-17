import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './SignupForm.css'

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

        AuthService
            .signUpUser(userData)
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

                <Form.Group className="mb-4" controlId="formGroupEmail">
                    <Form.Label className="signup-text">Email</Form.Label>
                    <Form.Control
                        className="form-input w-75"
                        type="email"
                        name="email"
                        placeholder="Ingresa tu email"
                        value={userData.email}
                        onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formGroupPassword">
                    <Form.Label className="signup-text">Contraseña</Form.Label>
                    <Form.Control
                        className="form-input w-75"
                        type="password"
                        name="password"
                        placeholder="Ingresa tu contraseña"
                        value={userData.password}
                        onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formGroupName">
                    <Form.Label className="signup-text">Nombre de usuario</Form.Label>
                    <Form.Control
                        className="form-input w-75"
                        type="text"
                        name="username"
                        placeholder="Elige tu nombre de usuario"
                        value={userData.username}
                        onChange={handleInputChange} />
                </Form.Group>

                <Button className="signup-button w-75 mt-3" type="submit">Crear usuario</Button>
            </Form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    )
}

export default SignupForm