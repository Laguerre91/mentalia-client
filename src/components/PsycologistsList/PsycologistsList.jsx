import { useState, useEffect } from "react"

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
        <section className="PsycologistsList">
            {
                psycologists.map((psyc) => (
                    <PsycologistCard key={psycologists._id}{...psyc} />
                ))
            }
        </section>
    )
}

export default PsycologistsList