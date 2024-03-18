import { useState } from 'react'
import { Row, Col, Card, Nav, Button, Modal, Badge } from 'react-bootstrap'
import recordServices from '../../services/record.services'
import './RecordCard.css'
import EditRecordForm from "../../components/Forms/EditRecordForm/EditRecordForm"
import { formatDate } from "../../utils/utils"
import MoodAnimation from '../Animations/MoodAnimation'
import WeatherAnimation from '../Animations/WeatherAnimation'

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
                            <Col xs={3}>
                                <Nav.Item>
                                    <Nav.Link eventKey="#mood">1</Nav.Link>
                                </Nav.Item>
                            </Col>
                            <Col xs={3}>
                                <Nav.Item>
                                    <Nav.Link eventKey="#stats">2</Nav.Link>
                                </Nav.Item>
                            </Col>
                            <Col xs={3}>
                                <Nav.Item>
                                    <Nav.Link eventKey="#moredetails">3</Nav.Link>
                                </Nav.Item>
                            </Col>
                            <Col xs={3}>
                                <Nav.Item>
                                    <Nav.Link eventKey="#reflection">4</Nav.Link>
                                </Nav.Item>
                            </Col>
                        </Row>
                    </Nav>
                </Card.Header>
                <Card.Title className='title'>
                    {formatDate(new Date(date))}
                </Card.Title>
                <Card.Body>
                    {activeKey === '#mood' ? (
                        <>
                            <Card.Text>
                                <Row>
                                    <Col>
                                        <MoodAnimation moodValue={mood} />
                                    </Col>
                                    <Col>
                                        <WeatherAnimation weatherValue={weather} />
                                    </Col>
                                </Row>
                            </Card.Text>
                        </>
                    ) : activeKey === '#stats' ? (
                        <>
                            <Row className='stats'>
                                <Col className="rateDay">
                                    <h1>{rateDay}</h1>
                                    <p>Nota del día</p>
                                </Col>
                                <br />
                                <Col className='hoursOfSleep'>
                                    <h1>{hoursOfSleep}</h1>
                                    <p>Horas de sueño</p>
                                </Col>
                            </Row>
                        </>
                    ) : activeKey === '#moredetails' ? (
                        <>
                            <Row>
                                <Col className="worries-grid">

                                    {worries.map((worry, index) => (
                                        <Badge key={index} className="custom-badge">
                                            {worry}
                                        </Badge>
                                    ))}

                                </Col>
                                <br />
                                <Col>
                                    <div className="emojis">
                                        {didExercise && <span>🏋️‍♂️</span>}
                                        {didHidrate && <span>💧</span>}
                                        {ateHealthy && <span>🥗</span>}
                                        {hasPsyc && <span>🧘</span>}
                                        {isMedicated && <span>💊</span>}
                                        {isMenstruating && <span>🩸</span>}
                                        {hasPeriodPain && <span>😣</span>}
                                    </div>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <>
                            <Card.Text className='reflection'>
                                <h2>Reflexión:</h2>
                                <p>{reflection}</p>
                            </Card.Text>
                            <div className="mood-btns">
                                <Button className="w-30" variant="danger" onClick={handleShowCancelModal}>
                                    Borrar
                                </Button>
                                <Button className="w-30" variant="success" onClick={handleEditModal}>
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