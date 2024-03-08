import { Button, Modal } from "react-bootstrap"
import RecordForm from "../../components/Forms/RecordForm/RecordForm"
import UserDetails from "../../components/UserDetails/UserDetails"
import AppointmentForm from "../../components/Forms/AppointmentForm/AppointmentForm"
import AppointmentsList from "../../components/AppointmentsList/AppointmentsList"
import RecordsList from "../../components/RecordsList/RecordsList"


import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import UserService from './../../services/user.services'

const UserDashboardPage = () => {

    const [showModal, setShowModal] = useState(false)
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
        <div className="UserDashboardPage">

            <UserDetails />

            <Button variant="primary" onClick={() => setShowModal(true)}>
                Mood Diario
            </Button>

            <RecordsList />

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title>¿Cómo te sientes hoy, cari?</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <RecordForm onHide={() => setShowModal(false)} />

                </Modal.Body>
            </Modal>

            <AppointmentForm getUser={getUser} />

            <AppointmentsList userDetails={userDetails} />

        </div>
    )
}

export default UserDashboardPage