import { Link } from 'react-router-dom'

import './PsycologistCard.css'

const PsycologistCard = ({ _id, name, image, yearsOfExperience, rate }) => {

    return (
        <div className="PsycologistCard" key={_id}>
            <Link to={`/psicologo/${_id}`}>
                <h2>{name}</h2>
            </Link>
            <img src={image} alt={`Foto de ${name}`} />
            <p>Años de experiencia: {yearsOfExperience}</p>
            <p>Promedio de calificacion: {rate}</p>
        </div>
    )
}

export default PsycologistCard