import './SecondDescriptionSection.css'
import { Col, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SecondDescriptionSection = () => {
    return (
        <section className='SecondDescriptionSection'>
            <Row className='m-0'>
                <Col xs={12} md={6}>
                    <h2 className='description-title'>La salud mental es salud.</h2>
                    <h5 className='description-underTitle'>Estamos aquí para acompañarte. Accede a nuestra red de psicólogos</h5>
                    <Link to={'/signup'}>
                        <Button className='btn-signup'>Registrate</Button>
                    </Link>
                </Col>
                <Col>

                </Col>
            </Row>
        </section>
    )
}

export default SecondDescriptionSection