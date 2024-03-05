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

                    <article key={psyc._id}>
                        <PsycologistCard {...psyc} />
                    </article>

                ))
            }
        </section>
    )
}

export default PsycologistsList