import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'

import { Image } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

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
        <section className="UserCard">

            <div className='user-greetings d-flex m-2 mb-3'>
                {user.imageUrl ? (
                    <Image className='w-25' src={user.imageUrl} roundedCircle />
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
                                <Icon.SuitcaseLg />
                                <p >
                                    Desempleado/a
                                </p>

                            </div>
                            :
                            <div className='d-flex'>
                                <Icon.SuitcaseLg />
                                <p>Empleado/a</p>
                            </div>

                    }
                    <div className='d-flex '>
                        <Icon.Heart />
                        <p>{user.sentimentalStatus}</p>
                    </div>
                    {
                        user.gender === "Prefiero no responder" ?
                            <div className='d-none'></div> :
                            <div className='d-flex'>
                                <Icon.GenderTrans />
                                <p>{user.gender}</p>
                            </div>
                    }
                    {
                        user.sexualOrientation === "Prefiero no responder" ? <div className='d-none'></div> :
                            <div className='d-flex'>
                                🏳️‍🌈
                                <p className='ms-2'>{user.sexualOrientation} </p>
                            </div>
                    }
                </div>
            ) : (
                <p>
                    Por favor, completa la información en el formulario para obtener detalles sobre tu perfil.
                </p>
            )}

            < EditUserForm getUser={getUser} />

            <div className='d-flex btn-logout'>
                <Icon.Lock />
                <p onClick={() => {
                    logout()
                }}>Cerrar sesión</p>
            </div>
        </section>
    )
}

export default UserDetails