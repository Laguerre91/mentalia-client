import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../context/auth.context'
import DatePicker from 'react-date-picker'
import TimePicker from 'react-bootstrap-time-picker'
import { format } from "@formkit/tempo"
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'

import { Form, Button, Container } from 'react-bootstrap'

import PsycologistService from './../../../services/psyc.services'
import appointmentServices from '../../../services/appointment.services'

const AppointmentForm = ({ getUser }) => {

    const { user } = useContext(AuthContext)

    const initialAppointmentState = {
        date: format(new Date(), "full"),
        time: "",
        psycologist: '',
        client: user._id,
        comments: ''
    }

    const [appointment, setAppointment] = useState(initialAppointmentState)

    const [psycologists, setPsycologists] = useState([])

    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(0)

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
        setDate(date);
        const formattedDate = format(date, "full");
        setAppointment({ ...appointment, date: formattedDate })
    }

    const handleTimeChange = (time) => {
        setTime(time)
        const formattedTime = (time / 3600).toFixed(2)
        setAppointment({ ...appointment, time: formattedTime })
    }

    const handleCommentsChange = (e) => {
        setAppointment({ ...appointment, comments: e.target.value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        console.log("Fecha antes de enviar al servidor:", appointment.date)

        appointmentServices
            .createAppointment(appointment)
            .then((response) => {
                setAppointment(initialAppointmentState)
                getUser()
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
                    clearIcon={null} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Selecciona un horario</Form.Label>
                <TimePicker
                    onChange={handleTimeChange}
                    start="10:00"
                    end="20:00"
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