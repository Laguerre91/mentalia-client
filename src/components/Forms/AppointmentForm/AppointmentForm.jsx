import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import PsycologistService from './../../../services/psyc.services'

const AppointmentForm = () => {

    const [appointment, setAppointment] = useState({
        date: new Date,
        psycologist: '',
        client: ''
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

    const handleInputChange = () => {

    }

    return (
        <Form className='AppointmentForm'>
            <Form.Select aria-label="Default select example">
                <option>Elige tu psicólogo</option>
                {
                    psycologists.map(psyc => (
                        <option
                            key={psyc._id}
                            value={psyc.name}
                            onChange={handleInputChange}>

                            {psyc.name} {psyc.lastName}

                        </option>
                    ))
                }
            </Form.Select>
        </Form>
    )
}

export default AppointmentForm