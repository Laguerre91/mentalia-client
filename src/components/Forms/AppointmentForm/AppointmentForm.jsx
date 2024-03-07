import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../context/auth.context'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'

import Form from 'react-bootstrap/Form'

import PsycologistService from './../../../services/psyc.services'
import appointmentServices from '../../../services/appointment.services'

const AppointmentForm = () => {

    const { user } = useContext(AuthContext)

    const [appointment, setAppointment] = useState({
        date: new Date(),
        psycologist: '',
        client: user._id,
        comments: ''
    })

    const [psycologists, setPsycologists] = useState([])
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        getAllPsycologists()
    }, [])

    const getAllPsycologists = () => {
        PsycologistService
            .getAllPsycologists()
            .then(({ data }) => setPsycologists(data))
            .catch((err) => console.log(err))
    }

    const handleInputChange = (e) => {
        setAppointment({ ...appointment, psycologist: e.target.value })
    }

    const handleCalendarChange = (date) => {
        setDate(date)
        setAppointment({ ...appointment, date: date });
    }

    const handleCommentsChange = (e) => {
        setAppointment({ ...appointment, comments: e.target.value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        const { date, psycologist, client, comments } = appointment
        const requestBody = { date, psycologist, client, comments }

        appointmentServices
            .createAppointment(requestBody)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => console.log(err))

    }

    return (
        <Form className='AppointmentForm' onSubmit={handleFormSubmit} >
            <Form.Group controlId='psycologistSelect'>
                <Form.Label>Elige tu psicólogo</Form.Label>
                <Form.Select
                    aria-label='Default select example'
                    onChange={handleInputChange}
                    value={appointment.psycologist}
                >
                    <option>Seleccione un psicólogo</option>
                    {psycologists.map((psyc) => (
                        <option key={psyc._id} value={psyc?._id}>
                            {psyc.name} {psyc.lastName}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group controlId='calendar'>
                <Form.Label>Selecciona una fecha</Form.Label>
                <DatePicker
                    onChange={handleCalendarChange}
                    value={date}
                    required={true}
                    clearIcon={null} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Agrega comentarios sobre tu consulta</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={handleCommentsChange}
                    value={appointment.comments} />
            </Form.Group>

            <button type="submit">Solicitar</button>
        </Form>
    )
}

export default AppointmentForm