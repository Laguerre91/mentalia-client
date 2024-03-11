import { Col, Row } from 'react-bootstrap'

import iPhone from './../../../assets/iPhone13.png'

import './DescriptionSection.css'

const DescriptionSection = () => {
    return (
        <section className="DescriptionSection">
            <Row className='m-0'>
                <Col xs={12} md={6}>
                    <h2 className='description-title'>¿Cómo te sientes hoy?</h2>
                    <h5 className='description-underTitle'>No todos los días amanece soleado. Todas las emociones son válidas y hay días mejores y peores. Lleva registro de tu estado de ánimo día a día para entender y gestionar mejor tus emociones.</h5>
                </Col>
                <Col className='description-picture-container'>
                    <img className='description-picture' src={iPhone} alt="App picture" />
                </Col>
            </Row>
        </section>
    )
}

export default DescriptionSection