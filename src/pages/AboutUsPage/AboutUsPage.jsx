import React from 'react';
import * as Icon from 'react-bootstrap-icons'
import './AboutUsPage.css';

const AboutUsPage = () => {
    return (
        <div className="AboutUsPage">
            <div className="profile-container">
                <div className="profile-card">
                    <a href="URL_LINKEDIN_LARA" target="_blank">
                        <img className="profile-picture" src="https://res.cloudinary.com/dfauz5m6o/image/upload/v1710415197/lagvcswgryyl3dfnlusx.jpg" alt="Foto de Lara" />
                    </a>
                    <div className="profile-overlay">
                        <div className="overlay-content">
                            <a className="profile-link" href="https://www.linkedin.com/in/lara-aguerre-developer/" target="_blank">
                                <Icon.Linkedin />
                                LinkedIn
                            </a>
                            <a className="profile-link" href="https://github.com/Laguerre91/" target='_blank'>
                                <Icon.Github />
                                Github
                            </a>
                        </div>
                    </div>
                </div>
                <div className="profile-card">
                    <a href="URL_GITHUB_LARA" target="_blank">
                        <img className="profile-picture" src="https://res.cloudinary.com/dfauz5m6o/image/upload/v1710418090/chcj2bawite4io5sjhty.jpg" alt="Foto de Francisco" />
                    </a>
                    <div className="profile-overlay">
                        <div className="overlay-content">
                            <a className="profile-link" href="https://www.linkedin.com/in/franpazos/" target="_blank">
                                <Icon.Linkedin />
                                LinkedIn
                            </a>
                            <a className="profile-link" href="https://github.com/FranPazos/" target='_blank'>
                                <Icon.Github />
                                Github
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='aboutUs-description w-50'>
                <p>Somos estudiantes entusiastas de desarrollo web en Ironhack, comprometidos con el aprendizaje y la innovación. Mi compañero Francisco y yo formamos un equipo dinámico que combina habilidades creativas y técnicas. <br />
                    Este proyecto no solo es el resultado de nuestro arduo trabajo, sino también un testimonio de nuestro compromiso con la excelencia y la innovación en el campo del desarrollo web. Estamos emocionados de presentar nuestro proyecto final como un paso más en nuestro viaje hacia el éxito en la industria tecnológica.
                </p>
            </div>
        </div>
    )
}

export default AboutUsPage;

