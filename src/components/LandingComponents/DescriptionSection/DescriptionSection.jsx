import { Col, Row } from 'react-bootstrap'

import './DescriptionSection.css'

const DescriptionSection = () => {
    return (
        <section className="DescriptionSection">
            <Row>
                <Col xs={12} md={6}>
                    <h2 className='description-title'>¿Cómo te sientes hoy?</h2>
                </Col>
                <Col>

                </Col>
            </Row>
        </section>
    )
}

export default DescriptionSection