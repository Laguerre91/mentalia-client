import { useState, useEffect } from "react"
import { Container } from "react-bootstrap"

import './PsycologistsList.css'

import PsycologistCard from "../PsycologistCard/PsycologistCard"
import PsycologistService from './../../services/psyc.services'

const PsycologistsList = () => {

    const [psycologists, setPsycologists] = useState([])

    useEffect(() => {
        getAllPsycologists()
    }, [])

    const getAllPsycologists = () => {
        PsycologistService
            .getAllPsycologists()
            .then(({ data }) => setPsycologists(data))
            .catch((err) => console.log(err))
    }

    return (
        <Container className="PsycologistsList">
            {
                psycologists.map((psyc) => <PsycologistCard {...psyc} key={psyc._id} />)
            }
        </Container>
    )
}

export default PsycologistsList