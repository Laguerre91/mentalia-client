import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import SignupForm from "../../components/Forms/SignupForm/SignupForm";

import './SignUpPage.css'
import iphoneImage from './../../assets/iPhone13.png'

function SignupPage() {

    return (
        <div className="SignupPage">
            <Row className="signup-form-container w-0">
                <Col xs={12} md={6} className="signup-form">
                    <h2>Registrarse</h2>

                    <SignupForm />

                    <div className="signup-account w-75">
                        <p>Ya tienes una cuenta? <Link to={"/login"}>Inicia Sesión</Link></p>
                    </div>
                </Col>
                <Col className="image-form">
                    <img className="signup-phone" src={iphoneImage} alt="iphone" />
                </Col>
            </Row>

        </div>
    )
}

export default SignupPage;