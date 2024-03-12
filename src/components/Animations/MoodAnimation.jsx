import verygood from '../../assets/muy-bien.svg'
import good from '../../assets/bien.svg'
import normal from '../../assets/normal.svg'
import bad from '../../assets/mal.svg'
import verybad from '../../assets/muy-mal.svg'

import "./MoodAnimation.css"



const MoodAnimation = ({ moodValue }) => {
    let moodImage

    switch (moodValue) {
        case 'Muy bien':
            moodImage = verygood
            break
        case 'Bien':
            moodImage = good
            break
        case 'Normal':
            moodImage = normal
            break
        case 'Mal':
            moodImage = bad
            break
        case 'Muy mal':
            moodImage = verybad
            break
        default:
            moodImage = null
            break
    }

    return (
        <div className="faces">
            <img src={moodImage} alt={moodValue} />
        </div>
    )
}

export default MoodAnimation