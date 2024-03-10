import './Hero.css'
import heroFaces from './../../../assets/Frame7.svg'
import { Button } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section className="hero">

            <div className='hero-container'>
                <h1 className='hero-title'>Eleva tu estado emocional con nuestro Mood Tracker</h1>
                <h5 className='hero-description'>Poténciate con auto-conciencia, lleva un registro de tus emociones, consigue citas con psicólogos verificados y desencadena una mejor versión de tí mismo </h5>

                <Link to={'/signup'}>
                    <Button className='hero-btn-signup'>Registrate</Button>
                </Link>

            </div>

            <div className='hero-faces'>
                <img src={heroFaces} alt="sfsd" />
            </div>

        </section>
    )

}

export default Hero