import { useState } from 'react';


import { Card, Button, Modal } from 'react-bootstrap'

import AppointmentForm from "../../components/Forms/AppointmentForm/AppointmentForm"

import './PsycologistCard.css'

const PsycologistCard = ({ _id, name, profileImage, yearsOfExperience, rate, contact }) => {

    const [showContactInfo, setShowContactInfo] = useState(false)

    const handleContactClick = () => {
        setShowContactInfo(true);
    };

    const handleCloseContactInfo = () => {
        setShowContactInfo(false);
    };


    return (
        <Card className="PsycologistCard m-1 mb-3" key={_id}>
            <Card.Img className='psyc-image' variant="top" src={profileImage} alt={`Foto de ${name}`} />
            <Card.Body>
                <Card.Title className='card-title'>
                    <h2>{name}</h2>
                </Card.Title>
                <Card.Text className='card-text mb-4'>
                    {yearsOfExperience} años de experiencia <br />
                    Promedio de calificacion: {rate}
                </Card.Text>
                <div className='btns-contact-appointment'>
                    <Button className='btn-card mb-2' onClick={handleContactClick}>Contactar</Button>
                    <AppointmentForm />
                </div>
            </Card.Body>

            <Modal show={showContactInfo} onHide={handleCloseContactInfo}>
                <Modal.Header closeButton>
                    <Modal.Title>Información de contacto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Email: {contact.email}</p>
                    <p>Número de teléfono: {contact.phoneNumber}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseContactInfo}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    )
}

export default PsycologistCard 