import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../context/auth.context'
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import PsycologistService from './../../../services/psyc.services'
import appointmentServices from '../../../services/appointment.services'

const AppointmentForm = () => {

    const { user } = useContext(AuthContext)

    const initialAppointmentState = {
        date: new Date(),
        time: '',
        psycologist: '',
        client: user._id,
        comments: ''
    }

    const [appointment, setAppointment] = useState(initialAppointmentState)

    const [psycologists, setPsycologists] = useState([])

    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState('10:00')

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
        setAppointment({ ...appointment, date });
    }

    const handleTimeChange = (time) => {
        setTime(time)
        setAppointment({ ...appointment, time })
    }

    const handleCommentsChange = (e) => {
        setAppointment({ ...appointment, comments: e.target.value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        appointmentServices
            .createAppointment(appointment)
            .then((response) => {
                setAppointment(initialAppointmentState)
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
                    {
                        psycologists.map((psyc) => (
                            <option key={psyc._id} value={psyc._id}>
                                {psyc.name} {psyc.lastName}
                            </option>
                        ))
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group>
                <Form.Label>Selecciona una fecha</Form.Label>
                <DatePicker
                    onChange={handleCalendarChange}
                    value={date}
                    required={true}
                    clearIcon={null}
                    dateFormat="Pp" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Selecciona un horario</Form.Label>
                <TimePicker
                    onChange={handleTimeChange}
                    value={time}
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

            <Button variant="warning" type="submit">Solicitar</Button>
        </Form>
    )
}

export default AppointmentForm