import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import RecordForm from "../components/Forms/RecordForm/RecordForm"
import UserCard from "../components/UserCard/UserCard"
import AppointmentForm from "../components/Forms/AppointmentForm/AppointmentForm"

const UserDashboardPage = () => {

    const [showModal, setShowModal] = useState(false)

    return (
        <div className="UserDashboardPage">

            <UserCard />

            <Button variant="primary" onClick={() => setShowModal(true)}>
                Mood Diario
            </Button>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title>COMO TE SIENTES HOY?</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <RecordForm />

                </Modal.Body>
            </Modal>

            <AppointmentForm />

        </div>
    )
}

export default UserDashboardPage