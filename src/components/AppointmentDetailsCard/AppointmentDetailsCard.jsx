import { Container, Card, Button } from 'react-bootstrap'

import './AppointmentDetailsCard.css'

const AppointmentDetailsCard = ({ date, time, psycologist, comments }) => {

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
                    <Button className='btn-deleteAppointment w-25' variant="danger">Cancelar cita</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AppointmentDetailsCard