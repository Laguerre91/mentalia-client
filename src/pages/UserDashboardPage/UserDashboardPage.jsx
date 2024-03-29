import { Button, Modal, Row, Col } from "react-bootstrap"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import UserService from './../../services/user.services'

import RecordForm from "../../components/Forms/RecordForm/RecordForm"
import UserDetails from "../../components/UserDetails/UserDetails"
import AppointmentForm from "../../components/Forms/AppointmentForm/AppointmentForm"
import AppointmentsList from "../../components/AppointmentsList/AppointmentsList"
import LatestRecord from "../../components/LatestRecord/LatestRecord"
import RateDayChart from "../../components/Charts/RateDayChart/RateDayChart"
import SleepChart from "../../components/Charts/SleepChart/SleepChart"
import MoodChart from "../../components/Charts/MoodChart/MoodChart"

import './UserDashboardPage.css'

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
        <section className="UserDashboardPage">
            <Row>
                <Col md={3} className="user-column">
                    <UserDetails />
                    <AppointmentForm getUser={getUser} />
                    <AppointmentsList userDetails={userDetails} getUser={getUser} />
                </Col>

                <Col md={6}>
                    <div className="user-feelCard">
                        <h4>¿Cómo te sientes hoy, {userDetails.username}?</h4>
                        <p>Registra to mood!</p>
                        <Button className="btn-userState mt-4" onClick={() => setShowModal(true)}>
                            Registrar estado
                        </Button>
                    </div>

                    <RateDayChart />
                    <SleepChart />
                </Col>

                <Col md={3} className="records-and-appointments-column">
                    <LatestRecord userDetails={userDetails} getUser={getUser} />
                    <MoodChart />
                </Col>

            </Row>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title" >¿Cómo te sientes hoy?</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <RecordForm
                        onHide={() => setShowModal(false)}
                        getUser={getUser} />

                </Modal.Body>
            </Modal>
        </section>
    )
}

export default UserDashboardPage