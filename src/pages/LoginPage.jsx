import { Link } from "react-router-dom"

import LoginForm from "../components/Forms/LoginForm/LoginForm"

const LoginPage = () => {

    return (
        <div className="LoginPage">
            <h1>Login</h1>

            <LoginForm />

            <p>Don't have an account yet?</p>
            <Link to={"/signup"}> Sign Up</Link>
        </div>
    )
}

export default LoginPage