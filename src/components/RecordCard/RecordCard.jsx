import { useState } from 'react'
import { Row, Col, Card, Nav, Button, Modal, Form } from 'react-bootstrap'
import recordServices from '../../services/record.services'
import './RecordCard.css'
import EditRecordForm from "../../components/Forms/EditRecordForm/EditRecordForm"
import { format } from "@formkit/tempo"
import MoodAnimation from '../Animations/MoodAnimation'

const RecordCard = ({
    _id,
    user,
    date,
    mood,
    rateDay,
    worries,
    didExercise,
    didHidrate,
    ateHealthy,
    hasPsyc,
    isMedicated,
    isMenstruating,
    hasPeriodPain,
    weather,
    hoursOfSleep,
    reflection,
    getUser
}) => {

    const [activeKey, setActiveKey] = useState('#mood')
    const [showCancelModal, setShowCancelModal] = useState(false)

    const [showEditModal, setShowEditModal] = useState(false)

    const handleShowCancelModal = () => setShowCancelModal(true)
    const handleCloseCancelModal = () => setShowCancelModal(false)

    const handleNavSelect = (selectedKey) => {
        setActiveKey(selectedKey)
    }

    const handleEditModal = () => {
        setShowEditModal(true)
    }

    const handleDelete = () => {
        recordServices
            .deleteRecord(_id)
            .then(() => {
                getUser()
                handleCloseCancelModal()
                res.sendStatus(204)
            })
            .catch(err => {
                handleCloseCancelModal()
                res.status(500).json(err)
            })
    }

    const recordProps = {
        _id,
        date,
        mood,
        rateDay,
        worries,
        didExercise,
        didHidrate,
        ateHealthy,
        hasPsyc,
        isMedicated,
        isMenstruating,
        hasPeriodPain,
        weather,
        hoursOfSleep,
        reflection
    }


    return (
        <>
            <Card
                bg={'light'}
                key={_id}
                text={'dark'}
                className="recordcard"
            >
                <Card.Header>
                    <Nav variant="pills" activeKey={activeKey} onSelect={handleNavSelect}>
                        <Row>
                            <Col xs={4}>
                                <Nav.Item>
                                    <Nav.Link eventKey="#mood">1</Nav.Link>
                                </Nav.Item>
                            </Col>
                            <Col xs={4}>
                                <Nav.Item>
                                    <Nav.Link eventKey="#moredetails">2</Nav.Link>
                                </Nav.Item>
                            </Col>
                            <Col xs={4}>
                                <Nav.Item>
                                    <Nav.Link eventKey="#reflection">3</Nav.Link>
                                </Nav.Item>
                            </Col>
                        </Row>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{date}</Card.Title>
                    <br />
                    {activeKey === '#mood' ? (
                        <>
                            <Card.Text>
                                <Row>
                                    <Col>
                                        <p>Preocupaciones:</p>
                                        <div className="worries-grid">
                                            {worries.map((worry, index) => (
                                                <div key={index}>{worry}</div>
                                            ))}
                                        </div>
                                    </Col>
                                    <Col>
                                        <p> Un día de {rateDay}</p>
                                        <MoodAnimation moodValue={mood} />
                                    </Col>
                                </Row>
                            </Card.Text>
                        </>
                    ) : activeKey === '#moredetails' ? (
                        <>
                            <div className="emojis">
                                {didExercise && <span>🏋️‍♂️</span>}
                                {didHidrate && <span>💧</span>}
                                {ateHealthy && <span>🥗</span>}
                                {hasPsyc && <span>🧘</span>}
                                {isMedicated && <span>💊</span>}
                                {isMenstruating && <span>🩸</span>}
                                {hasPeriodPain && <span>😣</span>}
                            </div>
                            <p>Dormí {hoursOfSleep} horas</p>
                        </>
                    ) : (
                        <>
                            <Card.Text>
                                <p>Reflexión:</p>
                                <p>{reflection}</p>
                            </Card.Text>
                            <div className="mood-btns">
                                <Button className="w-50" variant="danger" onClick={handleShowCancelModal}>
                                    Borrar
                                </Button>
                                <Button className="w-50" variant="success" onClick={handleEditModal}>
                                    Editar
                                </Button>
                            </div>

                            <Modal
                                show={showEditModal}
                                fullscreen={false}
                                onHide={() => setShowEditModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edita el Mood del {date}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EditRecordForm
                                        getUser={getUser}
                                        showEditModal={showEditModal}
                                        setShowEditModal={setShowEditModal}
                                        {...recordProps} />
                                </Modal.Body>
                            </Modal>

                            <Modal
                                show={showCancelModal}
                                onHide={handleCloseCancelModal}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Borrar Mood</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    ¿Estás seguro/a que deseas eliminar el mood del {date}? No podrás recuperarlo
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseCancelModal}>
                                        Cancelar
                                    </Button>
                                    <Button variant="danger" onClick={handleDelete}>
                                        Borrar
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    )}


                </Card.Body>
            </Card>
        </>

    )
}

export default RecordCard 