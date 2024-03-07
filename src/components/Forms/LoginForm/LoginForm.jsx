import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../../context/auth.context";

const API_URL = "http://localhost:5005"

const LoginForm = () => {

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
        // TODO
        axios
            .post(`${API_URL}/api/auth/login`, requestBody)
            .then((response) => {
                storeToken(response.data.authToken)
                authenticateUser()
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    }

    return (
        <div className="LoginForm">
            <form onSubmit={handleLoginSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                />

                <button type="submit">Login</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

        </div>
    )
}

export default LoginForm