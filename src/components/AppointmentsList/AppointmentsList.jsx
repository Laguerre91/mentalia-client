import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import UserService from './../../services/user.services'

import AppointmentDetailsCard from './../AppointmentDetailsCard/AppointmentDetailsCard'

import './AppointmentsList.css'

const AppointmentsList = () => {

    const [userDetails, setUserDetails] = useState([])

    const { userId } = useParams()

    useEffect(() => {
        getUser()
    }, [userId])

    const getUser = () => {

        UserService
            .getUser(userId)
            .then(({ data }) => setUserDetails(data))
            .catch((err) => console.log(err))
    }

    return (
        <section>
            <h2>Tus citas pendientes</h2>
            <hr />
            {
                userDetails && userDetails.appointments && userDetails.appointments.map(appointment => <AppointmentDetailsCard {...appointment} key={appointment._id} />)
            }
        </section>
    )
}

export default AppointmentsList 