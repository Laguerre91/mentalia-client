import RecordCard from '../RecordCard/RecordCard'
import './LatestRecord.css'
import { Container, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from "../../context/auth.context"
import { useContext } from "react"

const LatestRecord = ({ userDetails, getUser }) => {

    const { user } = useContext(AuthContext)


    return (
        <Container className="latest-record">
            <h2>Ultimo registro</h2>
            <hr />
            <Row >
                {userDetails && userDetails.records && userDetails.records.length > 0 && (
                    <RecordCard {...userDetails.records[userDetails.records.length - 1]} getUser={getUser} />
                )}
            </Row>

            <Link to={`/usuario/${user._id}/records`}> <Button className="link-btn">Ver todos los Moods</Button></Link>

        </Container>
    )
}

export default LatestRecord
