import { useEffect, useContext, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import RecordCard from "../RecordCard/RecordCard"
import UserService from "../../services/user.services"
import { useParams } from "react-router-dom"

import "./RecordsList.css"

const RecordList = () => {

    const { userId } = useParams()

    const [userDetails, setUserDetails] = useState({ records: [] })

    useEffect(() => {
        getUser()
    }, [userId])

    const getUser = () => {
        UserService
            .getUser(userId)
            .then(({ data }) => {
                setUserDetails(data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <Container className="RecordsList">
            <Row xs={1} md={2} lg={3} className="g-5">
                {userDetails.records.map((record) => (
                    <Col key={record._id}>
                        <RecordCard {...record} getUser={getUser} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default RecordList
