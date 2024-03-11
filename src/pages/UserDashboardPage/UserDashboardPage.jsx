import { Button, Modal, Container, Row, Col } from "react-bootstrap"
import RecordForm from "../../components/Forms/RecordForm/RecordForm"
import UserDetails from "../../components/UserDetails/UserDetails"
import AppointmentForm from "../../components/Forms/AppointmentForm/AppointmentForm"
import AppointmentsList from "../../components/AppointmentsList/AppointmentsList"
import RecordsList from "../../components/RecordsList/RecordsList"
import RateDayChart from "../../components/Charts/RateDayChart/RateDayChart"

import './UserDashboardPage.css'

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
        <section className="UserDashboardPage">
            <Row>

                <Col md={3}>
                    <UserDetails />
                </Col>

                <Col>
                    <RateDayChart />
                    <div className="user-feelCard">
                        <h4>¿Cómo te sientes hoy, {userDetails.username}?</h4>
                        <p>Cuéntanos como te encuentras hoy</p>
                        <Button className="btn-userState mt-4" onClick={() => setShowModal(true)}>
                            Registrar estado
                        </Button>
                    </div>

                    <RecordsList userDetails={userDetails} getUser={getUser} />
                </Col>

                <Col>
                    <AppointmentForm getUser={getUser} />
                    <AppointmentsList userDetails={userDetails} getUser={getUser} />
                </Col>

            </Row>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title>¿Cómo te sientes hoy, cari?</Modal.Title>
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