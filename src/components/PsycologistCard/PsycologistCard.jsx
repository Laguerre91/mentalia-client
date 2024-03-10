import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import './PsycologistCard.css'

const PsycologistCard = ({ _id, name, profileImage, yearsOfExperience, rate }) => {

    return (
        <article className="PsycologistCard" key={_id}>
            <Link to={`/psicologo/${_id}`} className='link-to-psycologist'>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={profileImage} alt={`Foto de ${name}`} />
                    <Card.Body>
                        <Card.Title className='card-title'>
                            <h2>{name}</h2>
                        </Card.Title>
                        <Card.Text>
                            {yearsOfExperience} años de experiencia
                            Promedio de calificacion: {rate}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>

        </article>
    )
}

export default PsycologistCard 