import { useState, useContext } from 'react'
import { AuthContext } from '../../../context/auth.context'
import UserService from './../../../services/user.services'
import uploadServices from '../../../services/upload.services'
import { GENDER_LABELS, SEXUAL_ORIENTATION_LABELS, SENTIMENTAL_STATUS_LABELS } from './../../../consts/user.constants'

import './EditUserForm.css'

import { Form, Button, Modal } from 'react-bootstrap'

const EditUserForm = ({ getUser }) => {

    const { user } = useContext(AuthContext)

    const [updatedUser, setUpdatedUser] = useState({
        imageUrl: user.imageUrl || '',
        birth: user.birth || '',
        gender: user.gender || 'Masculino',
        sexualOrientation: user.sexualOrientation || 'Heterosexual',
        employed: user.employed || false,
        sentimentalStatus: user.sentimentalStatus || 'Soltero/a',
    })
    const [showUserModal, setShowUserModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setUpdatedUser({ ...updatedUser, [name]: inputValue })
    }

    const handleFileUpload = e => {

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setUpdatedUser({ ...updatedUser, imageUrl: res.data.cloudinary_url })
            })
            .catch(err => console.log(err))
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
        setShowUserModal(true);
    }

    return (
        <>

            <Button
                variant='dark'
                className="me-2 mb-2 w-100"
                onClick={handleShow}>
                Actualiza tu perfil
            </Button>
            <Modal
                show={showUserModal}
                backdrop="static"
                keyboard={false}
                onHide={() => setShowUserModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualiza tu usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} className='editUser-modal-form'>

                        <Form.Group className="group-userform mb-3" controlId="imageUrl">
                            <Form.Label>Carga tu imagen de perfil</Form.Label>
                            <Form.Control type="file" onChange={handleFileUpload} />
                        </Form.Group>

                        <Form.Group controlId="formBirth" className="group-userform mb-3">
                            <Form.Label className="test">¿Cuál es tu fecha de nacimiento?</Form.Label>
                            <Form.Control
                                type="date"
                                name="birth"
                                value={updatedUser.birth}
                                max={new Date().toISOString().split('T')[0]}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formGender" className="group-userform mb-3">
                            <Form.Label className="test">Selecciona tu género</Form.Label>
                            <Form.Select name="gender" value={updatedUser.gender} onChange={handleInputChange}>
                                {GENDER_LABELS.map((gender) => (
                                    <option key={gender} value={gender}>
                                        {gender}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formSexualOrientation" className="group-userform mb-3">
                            <Form.Label className="test">Selecciona tu orientación sexual</Form.Label>
                            <Form.Select name="sexualOrientation" value={updatedUser.sexualOrientation} onChange={handleInputChange}>
                                {SEXUAL_ORIENTATION_LABELS.map((orientation) => (
                                    <option key={orientation} value={orientation}>
                                        {orientation}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formEmployed" className="group-userform mb-3">
                            <Form.Check
                                type="checkbox"
                                label="¿Estás empleado/a?"
                                name="employed"
                                checked={updatedUser.employed}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, employed: e.target.checked })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formSentimentalStatus" className="group-userform mb-3">
                            <Form.Label className="test">Selecciona tu estado sentimental</Form.Label>
                            <Form.Select name="sentimentalStatus" value={updatedUser.sentimentalStatus} onChange={handleInputChange}>
                                {SENTIMENTAL_STATUS_LABELS.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Button className='w-100 btn-edituser-submit' variant="primary" type="submit">
                            Guardar cambios
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </>

    )
}

export default EditUserForm