import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/auth.context'

import { Form } from 'react-bootstrap'

const EditUserForm = () => {

    const { user } = useContext(AuthContext)

    const [updatedUser, setUpdatedUser] = useState({
        birth: user.birth,
        gender: user.gender,
        sexualOrientation: user.sexualOrientation,
        employed: user.employed,
        sentimentalStatus: user.sentimentalStatus
    })

    return (
        <Form>

        </Form>
    )
}

export default EditUserForm