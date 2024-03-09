import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import UserService from '../../services/user.services'

import './UserDetails.css'

const UserCard = () => {

    const [user, setUser] = useState([])

    const { userId } = useParams()

    useEffect(() => {
        getUser()
    }, [userId])

    const getUser = () => {
        UserService
            .getUser(userId)
            .then(({ data }) => setUser(data))
            .catch((err) => console.log(err))
    }

    return (
        <section className="UserCard">
            <h2>¡Hola, {user.username}!</h2>
            <p>Lo estás haciendo genial</p>
        </section>
    )
}

export default UserCard