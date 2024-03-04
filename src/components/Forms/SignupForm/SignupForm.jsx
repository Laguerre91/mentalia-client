import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

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

        axios
            .post(`${API_URL}/api/auth/signup`, requestBody)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                // const errorDescription = error.response.data.message;
                // setErrorMessage(errorDescription);
            })
    }

    return (
        <div className="SignupForm">
            <form onSubmit={handleSignupSubmit}>
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

                <label>Name:</label>
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                />

                <button type="submit">Sign Up</button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    )
}

export default SignupForm