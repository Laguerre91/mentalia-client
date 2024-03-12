import "./RecordList.css"

import { useState, useEffect } from "react"
import { Container } from "react-bootstrap"

import RecordCard from "../RecordCard/RecordCard"
import RecordServices from './../../services/record.services'

const RecordList = () => {

    const [records, setRecords] = useState([])

    useEffect(() => {
        getAllRecords()
    }, [])

    const getAllRecords = () => {
        RecordServices
            .getAllRecords()
            .then(({ data }) => setRecords(data))
            .catch((err) => console.log(err))
    }

    return (
        <Container className="RecordsList">
            {
                records.map((psyc) => <RecordCard {...psyc} key={psyc._id} />)
            }
        </Container>
    )
}

export default RecordList