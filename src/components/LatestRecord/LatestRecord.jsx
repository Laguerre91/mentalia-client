import RecordCard from '../RecordCard/RecordCard'
import './LatestRecord.css'
import { Container, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LatestRecord = ({ userDetails, getUser }) => {

    return (
        <Container>
            <h2>Ultimo registro</h2>
            <hr />
            <Row>
                {userDetails && userDetails.records && userDetails.records.length > 0 && (
                    <RecordCard {...userDetails.records[userDetails.records.length - 1]} getUser={getUser} />
                )}
            </Row>

            <Link><Button>Ver todos los Moods</Button></Link>

        </Container>
    )
}

export default LatestRecord
