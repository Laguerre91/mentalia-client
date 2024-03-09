import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/auth.context'
import UserService from './../../../services/user.services'
import { GENDER_LABELS, SEXUAL_ORIENTATION_LABELS, SENTIMENTAL_STATUS_LABELS } from './../../../consts/user.constants'

import { Form, Button, Modal } from 'react-bootstrap'

const EditUserForm = ({ getUser }) => {

    const { user } = useContext(AuthContext)

    const [updatedUser, setUpdatedUser] = useState({
        birth: user.birth || '',
        gender: user.gender || '',
        sexualOrientation: user.sexualOrientation || '',
        employed: user.employed || false,
        sentimentalStatus: user.sentimentalStatus || '',
    })
    const [fullscreen, setFullscreen] = useState(true);
    const [showUserModal, setShowUserModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setUpdatedUser({ ...updatedUser, [name]: inputValue })
    }

    const handleSubmit = (e) => {

        e.preventDefault()

        UserService
            .updateUser(user._id, updatedUser)
            .then(response => {
                setUpdatedUser(response.data)
                setShowUserModal(false)
                getUser()
            })
            .catch(err => console.log(err))

    }

    const handleShow = () => {
        setFullscreen(true);
        setShowUserModal(true);
    }

    return (
        <>

            <Button className="me-2 mb-2" onClick={handleShow}>
                Actualiza tu perfil
            </Button>
            <Modal show={showUserModal} fullscreen={fullscreen} onHide={() => setShowUserModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBirth">
                            <Form.Label>¿Cuál es tu fecha de nacimiento?</Form.Label>
                            <Form.Control
                                type="date"
                                name="birth"
                                value={updatedUser.birth}
                                max={new Date().toISOString().split('T')[0]}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formGender">
                            <Form.Label>Selecciona tu género</Form.Label>
                            <Form.Select name="gender" value={updatedUser.gender} onChange={handleInputChange}>
                                {GENDER_LABELS.map((gender) => (
                                    <option key={gender} value={gender}>
                                        {gender}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formSexualOrientation">
                            <Form.Label>Selecciona tu orientación sexual</Form.Label>
                            <Form.Select name="sexualOrientation" value={updatedUser.sexualOrientation} onChange={handleInputChange}>
                                {SEXUAL_ORIENTATION_LABELS.map((orientation) => (
                                    <option key={orientation} value={orientation}>
                                        {orientation}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formEmployed">
                            <Form.Check
                                type="checkbox"
                                label="¿Estás empleado/a?"
                                name="employed"
                                checked={updatedUser.employed}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, employed: e.target.checked })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formSentimentalStatus">
                            <Form.Label>Selecciona tu estado sentimental</Form.Label>
                            <Form.Select name="sentimentalStatus" value={updatedUser.sentimentalStatus} onChange={handleInputChange}>
                                {SENTIMENTAL_STATUS_LABELS.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Guardar cambios
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </>

    )
}

export default EditUserForm