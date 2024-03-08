import { Container } from 'react-bootstrap'

import './AppointmentDetailsCard.css'

const AppointmentDetailsCard = ({ date, time, psycologist, client, comments }) => {

    return (
        <Container className="AppointmentDetailsCard w-50">
            <p>Tienes fecha para el día {date} a la hora {time}</p>
            <p>Tu psicólogo es {psycologist.name} {psycologist.lastName}</p>
            <p>El motivo de la consulta que has añadido es: {comments}</p>
        </Container>
    )
}

export default AppointmentDetailsCard