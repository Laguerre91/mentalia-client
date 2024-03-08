import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PsycologistService from '../../services/psyc.services'

const PsycologistDetailsPage = () => {

    const [psycologist, setPsycologist] = useState([])

    const { psycId } = useParams();

    useEffect(() => {
        getPsycologist()
    }, [psycId])

    const getPsycologist = () => {
        PsycologistService
            .getPsycologist(psycId)
            .then(({ data }) => setPsycologist(data))
            .catch((err) => console.log(err))
    }

    return (
        <article className="PsycologistDetailsCard">
            <div key={psycologist._id}>
                <h2>{psycologist.name} {psycologist.lastName}</h2>
                <img src={psycologist.image} alt={`Foto de ${psycologist.name + psycologist.lastName}`} />
                <p>{psycologist.description}</p>
                <p>Psicologo con {psycologist.yearsOfExperience} años de experiencia</p>
                <p>Promedio de calificaciones de clientes: {psycologist.rate}</p>
                <p>Ponte en contacto: </p>
                {psycologist.contact && (
                    <>
                        <p>Numero de telefono: {psycologist.contact.phoneNumber || 'No disponible'}</p>
                        <p>Correo electronico: {psycologist.contact.email || 'No disponible'}</p>
                    </>
                )}
            </div>
        </article>
    )
}

export default PsycologistDetailsPage