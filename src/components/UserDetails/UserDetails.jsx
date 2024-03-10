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
        <section className="UserCard p-4">

            <div>

                <h2>¡Hola, {user.username}!</h2>
            </div>

            <p>Lo estás haciendo genial</p>

            {loading ? (
                <p>Cargando datos...</p>
            ) : user.gender &&
                user.sexualOrientation &&
                user.sentimentalStatus !== undefined ? (
                <div className="user-details">
                    <p>Tu género seleccionado es {user.gender}</p>
                    <p>Tu orientación sexual es {user.sexualOrientation} </p>
                    <p>Situación sentimental: {user.sentimentalStatus}</p>
                    <img src={user.image} alt="User" />
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