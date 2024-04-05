import { Row, Col, Image } from "react-bootstrap"
import LoginForm from './../../components/Forms/LoginForm/LoginForm'

import Blob from './../../assets/Blob.svg'
import './LoginPage.css'

const LoginPage = () => {
    return (

        <div className="LoginPage ">
            <Row className="login-form-container m-0">
                <Col className="login-form" xs={12} md={6}>
                    <h2>Inicia sesión</h2>
                    <LoginForm />
                </Col>
                <Col className="m-0">
                    <Image
                        className="w-50"
                        src={Blob}
                        alt="Image" />
                </Col>
            </Row>
        </div>

    )
}

export default LoginPage