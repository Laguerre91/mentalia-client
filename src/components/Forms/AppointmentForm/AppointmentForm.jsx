import { useState, useEffect } from 'react'
import DatePicker from 'react-date-picker'
import Form from 'react-bootstrap/Form'
import PsycologistService from './../../../services/psyc.services'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';


const AppointmentForm = () => {

    const [appointment, setAppointment] = useState({
        date: new Date,
        psycologist: ''
    })

    const [psycologists, setPsycologists] = useState([])

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

    return (
        <Form className='AppointmentForm'>
            <Form.Select
                aria-label="Default select example"
                onChange={handleInputChange}
                value={appointment.psycologist}>

                <option>Elige tu psicólogo</option>
                {
                    psycologists.map(psyc => (
                        <option key={psyc._id} value={psyc._id}>

                            {psyc.name} {psyc.lastName}

                        </option>
                    ))
                }
            </Form.Select>

            <DatePicker />
        </Form>
    )
}

export default AppointmentForm