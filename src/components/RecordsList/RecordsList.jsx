import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import UserService from './../../services/user.services'

import RecordCard from '../RecordCard/RecordCard'

import './RecordsList.css'
import { Container, Row } from 'react-bootstrap'

const RecordsList = ({ userDetails }) => {

    return (
        <Container>

            <h2>Tus Moods:</h2>

            <hr />

            <Row>
                {
                    userDetails && userDetails.records && userDetails.records.map(record => <RecordCard {...record} key={record._id} />)
                }
            </Row>


        </Container>

    )
}

export default RecordsList