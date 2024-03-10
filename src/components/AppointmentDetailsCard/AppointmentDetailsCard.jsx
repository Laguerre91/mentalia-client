import { useState } from 'react';
import { Container, Card, Button, Modal } from 'react-bootstrap';
import AppointmentService from './../../services/appointment.services';

import './AppointmentDetailsCard.css';

const AppointmentDetailsCard = ({ date, time, psycologist, comments, _id, getUser }) => {
    const [showCancelModal, setShowCancelModal] = useState(false);

    const handleShowCancelModal = () => setShowCancelModal(true);
    const handleCloseCancelModal = () => setShowCancelModal(false);

    const handleDelete = () => {
        AppointmentService
            .deleteAppointment(_id)
            .then(() => {
                getUser();
                handleCloseCancelModal();
            })
            .catch(err => {
                console.error(err);
                handleCloseCancelModal();
            });
    };

    return (
        <Container className="AppointmentDetailsCard">
            <Card className='appointment-card w-50'>
                <Card.Header as="h5">Tu cita</Card.Header>
                <Card.Body>
                    <Card.Title>Tu cita con {psycologist.name} {psycologist.lastName}</Card.Title>
                    <Card.Text>
                        Tienes fecha para el día {date} a las {time}
                    </Card.Text>
                    <Card.Text>
                        El motivo de la consulta que has añadido es: {comments}
                    </Card.Text>
                    <Button
                        className='btn-deleteAppointment w-25'
                        variant="danger"
                        onClick={handleShowCancelModal}
                    >
                        Cancelar cita
                    </Button>
                </Card.Body>
            </Card>

            <Modal
                show={showCancelModal}
                onHide={handleCloseCancelModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cancelar cita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    La cita se cancelará, ¿estás seguro/a que deseas proceder?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCancelModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Confirmar cancelación
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AppointmentDetailsCard;
