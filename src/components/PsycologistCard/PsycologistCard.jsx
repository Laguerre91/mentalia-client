import './PsycologistCard.css'


const PsycologistCard = ({ _id, name, yearsOfExperience }) => {

    return (
        <div className="PsycologistCard" key={_id}>
            <h2>{name}</h2>
            <p>Años de experiencia: {yearsOfExperience}</p>
        </div>
    )
}

export default PsycologistCard