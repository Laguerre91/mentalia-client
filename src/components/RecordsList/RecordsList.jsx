import RecordCard from '../RecordCard/RecordCard'

import './RecordsList.css'
import { Container, Row } from 'react-bootstrap'

const RecordsList = ({ userDetails, getUser }) => {

    return (
        <Container className='RecordsList'>

            <h2 className='recordsList-title'>Ultimo registro</h2>

            <hr />

            <Row>
                {
                    userDetails && userDetails.records && userDetails.records.map(record => <RecordCard {...record} key={record._id} getUser={getUser} />)
                }
            </Row>


        </Container>

    )
}

export default RecordsList
