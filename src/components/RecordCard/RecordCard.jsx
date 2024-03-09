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

    const [activeKey, setActiveKey] = useState('#first')

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
                    <Nav variant="pills" defaultActiveKey="#first">
                        <Nav.Item>
                            <Nav.Link href="#first">Active</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#link">Link</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>

                    {activeKey === '#first' ? (
                        <>
                            <Card.Title>{date}</Card.Title>
                            <Card.Text>
                                <p>El día {date} tuvo una nota de {rateDay}</p>
                                <p>Hoy me preocupan: {worries}</p>
                                <p>Dormí {hoursOfSleep} horas</p>
                            </Card.Text>
                        </>
                    ) : (
                        <p>Content for Link tab</p>
                    )}

                    <Button variant="danger">Delete Mood</Button>
                </Card.Body>
            </Card>
        </>

    )
}

export default RecordCard 