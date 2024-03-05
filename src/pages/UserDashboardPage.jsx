import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import RecordForm from "../components/Forms/RecordForm/RecordForm"

const UserDashboardPage = () => {

    const [show, setShow] = useState(false)


    return (
        <div className="UserDashboardPage">

            <h1>Hola User!</h1>

            <Button variant="primary" onClick={() => setShow(true)}>
                Mood Diario
            </Button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        COMO TE SIENTES HOY?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <RecordForm />

                </Modal.Body>
            </Modal>

        </div>
    )
}

export default UserDashboardPage