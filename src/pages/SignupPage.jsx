import { Link } from "react-router-dom";

import SignupForm from "../components/Forms/SignupForm/SignupForm";


function SignupPage(props) {

    return (
        <div className="SignupPage">
            <h1>Sign Up</h1>

            <SignupForm />

            <p>Already have account?</p>
            <Link to={"/login"}> Login</Link>
        </div>
    )
}

export default SignupPage;