import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import Logo from './../../assets/Mentalia-logo.png'

import './Footer.css'

const Footer = () => {

    return (

        <footer className='Footer'>
            <Row className='footer-row align-items-center'>
                <Col >
                    <ul className='footer-links'>
                        <Link to={"/sobre-nosotros"}>
                            <li>Quienes somos</li>
                        </Link>
                        <a href="https://github.com/Laguerre91/mentalia-client" target='_blank'>
                            <li><Icon.Github />Repositorio</li>
                        </a>
                    </ul>
                </Col>
                <img className='footer-logo mb-2' src={Logo} alt="Mentalia logo" />
                <Col className='footer-copyright me-4'>
                    <p>&copy; 2024 Mentalia. Hecho con ❤️</p>
                </Col>
            </Row>
        </footer>
    )
}

export default Footer