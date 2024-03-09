import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Container, Row, Col, Card, Nav, Button } from 'react-bootstrap'
import './RecordCard.css'
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
    reflection
}) => {

    const [activeKey, setActiveKey] = useState('#mood')

    const handleNavSelect = (selectedKey) => {
        setActiveKey(selectedKey)
    }


    return (
        <>
            <Card
                bg={'light'}
                key={_id}
                text={'dark'}
                style={{ width: '18rem' }}
                border="primary"
                className="mb-2"
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
                    {activeKey === '#mood' ? (
                        <>
                            <Card.Text>
                                <p>Carita de {mood}</p>
                                <p> {rateDay}</p>
                                <p>Preocupaciones:</p>
                                <div className="worries-grid">
                                    {worries.map((worry, index) => (
                                        <div key={index}>{worry}</div>
                                    ))}
                                </div>
                            </Card.Text>
                            <Card.Title>{date}</Card.Title>
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
                        </>
                    )}
                    <div className="mood-btns">
                        <Button className="w-50" variant="danger">
                            Delete
                        </Button>
                        <Button className="w-50" variant="success">
                            Edit
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </>

    )
}

export default RecordCard 