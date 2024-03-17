import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../context/auth.context'
import DatePicker from 'react-date-picker'
import TimePicker from 'react-bootstrap-time-picker'
import { format } from "@formkit/tempo"
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'

import './AppointmentForm.css'

import { Form, Button, Modal } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import PsycologistService from './../../../services/psyc.services'
import appointmentServices from '../../../services/appointment.services'

const AppointmentForm = ({ getUser }) => {

    const { user } = useContext(AuthContext)
    const [showForm, setShowForm] = useState(false);

    const handleClose = () => setShowForm(false);
    const handleShow = () => setShowForm(true);

    const initialTime = 10 * 60 * 60 * 1000
    const initialDate = new Date();
    initialDate.setHours(10, 0, 0, 0)

    const initialAppointmentState = {
        date: format(initialDate, "full"),
        time: '10:00',
        psycologist: '',
        client: user._id,
        comments: ''
    }

    const [appointment, setAppointment] = useState(initialAppointmentState)

    const [psycologists, setPsycologists] = useState([])

    const [date, setDate] = useState(initialDate)
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
        setDate(date);
        const formattedDate = format(date, "full");
        setAppointment({ ...appointment, date: formattedDate })
    }

    const handleTimeChange = (time) => {
        setTime(time);

        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);

        const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

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
        <>
            <Button className='btn-applyForDate' onClick={handleShow}>
                <Icon.Calendar4Event />
                Solicitar una cita
            </Button>

            <Modal show={showForm} onHide={handleClose}>
                <Modal.Body>
                    <Form className='AppointmentForm' onSubmit={handleFormSubmit} >
                        <Form.Group className='form-appointment-group mb-4' controlId='psycologistSelect'>
                            <Form.Label className="form-appoinment-label">Elige tu psicólogo</Form.Label>
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

                        <Form.Group className='form-appointment-group mb-4'>
                            <Form.Label className="form-appoinment-label">Selecciona una fecha</Form.Label>
                            <DatePicker
                                className="ms-3 form-appointment-calendar"
                                onChange={handleCalendarChange}
                                value={date}
                                required={true}
                                minDate={new Date()}
                                clearIcon={null} />
                        </Form.Group>

                        <Form.Group className='form-appointment-group mb-4'>
                            <Form.Label className="form-appoinment-label">Selecciona un horario</Form.Label>
                            <TimePicker
                                onChange={handleTimeChange}
                                start="10:00"
                                end="20:00"
                                step={30}
                                value={time}
                                required={true}
                                clearIcon={null} />
                        </Form.Group>

                        <Form.Group className='form-appointment-group mb-4'>
                            <Form.Label className="form-appoinment-label">Agrega comentarios sobre tu consulta</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                onChange={handleCommentsChange}
                                value={appointment.comments} />
                        </Form.Group>
                        <Button onClick={handleClose} className='btn-appForm' type="submit">Solicitar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AppointmentForm