import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import EditUserForm from '../Forms/EditUserForm/EditUserForm'

import UserService from '../../services/user.services'

import './UserDetails.css'

const UserCard = () => {

    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)

    const { userId } = useParams()

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
                    <img className='user-picture w-50 me-1' src={user.imageUrl} alt="User" />
                ) : (
                    <p className='user-picture-placeholder  me-1'>Carga tu imagen de perfil</p>
                )}
                <h2 className='m-3'>¡Hola, {user.username}!</h2>
            </div>
            <p className='mb-4'>Lo estás haciendo genial</p>

            {loading ? (
                <p>Cargando datos...</p>
            ) : user.gender &&
                user.sexualOrientation &&
                user.sentimentalStatus !== undefined ? (
                <div className="user-details">
                    <p>Tu género seleccionado es {user.gender}</p>
                    <p>Tu orientación sexual es {user.sexualOrientation} </p>
                    <p>Situación sentimental: {user.sentimentalStatus}</p>
                    {
                        user.employed === false ?
                            <p>Actualmente desempleado/a</p>
                            :
                            <p>Trabajando</p>}
                </div>
            ) : (
                <p>
                    Por favor, completa la información en el formulario para obtener detalles sobre tu perfil.
                </p>
            )}
            < EditUserForm getUser={getUser} />
        </section>
    )
}

export default UserCard