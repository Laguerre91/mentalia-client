import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'

import { Image, Button } from 'react-bootstrap'

import EditUserForm from '../Forms/EditUserForm/EditUserForm'

import UserService from '../../services/user.services'

import './UserDetails.css'

const UserDetails = () => {

    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)

    const { userId } = useParams()
    const { logout } = useContext(AuthContext)

    useEffect(() => {
        getUser()
    }, [userId])

    const getUser = () => {
        UserService
            .getUser(userId)
            .then(({ data }) => {
                setUser(data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }

    return (
        <section className="UserCard p-3">

            <div className='user-greetings d-flex m-2 mb-3'>
                {user.imageUrl ? (
                    <Image className='w-50' src={user.imageUrl} roundedCircle />
                ) : (
                    <p className='user-picture-placeholder  me-1'>Carga tu imagen de perfil</p>
                )}
                <h2 className='m-2'>¡Hola, {user.username}!</h2>
            </div>

            {loading ? (
                <p>Cargando datos...</p>
            ) : user.gender &&
                user.sexualOrientation &&
                user.sentimentalStatus !== undefined ? (
                <div className="user-details">
                    {
                        user.employed === false ?
                            <div className='d-flex'>
                                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4V2H8V4H12ZM2 6V17H18V6H2ZM18 4C19.11 4 20 4.89 20 6V17C20 18.11 19.11 19 18 19H2C0.89 19 0 18.11 0 17L0.00999999 6C0.00999999 4.89 0.89 4 2 4H6V2C6 0.89 6.89 0 8 0H12C13.11 0 14 0.89 14 2V4H18Z" fill="#ADADAD" />
                                </svg>
                                <p >
                                    Desempleado/a
                                </p>

                            </div>
                            :
                            <div className='d-flex'>
                                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4V2H8V4H12ZM2 6V17H18V6H2ZM18 4C19.11 4 20 4.89 20 6V17C20 18.11 19.11 19 18 19H2C0.89 19 0 18.11 0 17L0.00999999 6C0.00999999 4.89 0.89 4 2 4H6V2C6 0.89 6.89 0 8 0H12C13.11 0 14 0.89 14 2V4H18Z" fill="#ADADAD" />
                                </svg>
                                <p>Empleado/a</p>
                            </div>

                    }
                    <div className='d-flex '>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.4564 1.75C8.49952 1.75 9.99952 4.75 9.99952 4.75C9.99952 4.75 11.4995 1.75 14.5426 1.75C17.0158 1.75 18.9742 3.81906 18.9995 6.28797C19.0511 11.4128 14.9341 15.0573 10.4214 18.1202C10.297 18.2048 10.15 18.2501 9.99952 18.2501C9.84905 18.2501 9.70206 18.2048 9.57765 18.1202C5.06546 15.0573 0.948427 11.4128 0.999521 6.28797C1.02483 3.81906 2.98327 1.75 5.4564 1.75Z" stroke="#ADADAD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <p>{user.sentimentalStatus}</p>
                    </div>
                    <p>{user.gender}</p>
                    <p>{user.sexualOrientation} </p>
                </div>
            ) : (
                <p>
                    Por favor, completa la información en el formulario para obtener detalles sobre tu perfil.
                </p>
            )}

            < EditUserForm getUser={getUser} />

            <div className='d-flex btn-logout'>
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.2226 7H16.0436V5C16.0436 2.24 13.4027 0 10.1487 0C6.8947 0 4.25376 2.24 4.25376 5V7H3.07477C1.77789 7 0.716797 7.9 0.716797 9V19C0.716797 20.1 1.77789 21 3.07477 21H17.2226C18.5195 21 19.5806 20.1 19.5806 19V9C19.5806 7.9 18.5195 7 17.2226 7ZM10.1487 16C8.85182 16 7.79073 15.1 7.79073 14C7.79073 12.9 8.85182 12 10.1487 12C11.4456 12 12.5067 12.9 12.5067 14C12.5067 15.1 11.4456 16 10.1487 16ZM6.61174 7V5C6.61174 3.34 8.19158 2 10.1487 2C12.1058 2 13.6857 3.34 13.6857 5V7H6.61174Z" fill="#ADADAD" />
                </svg>

                <p onClick={() => {
                    logout()
                }}>Cerrar sesión</p>
            </div>
        </section>
    )
}

export default UserDetails