import { useState, useContext } from 'react'
import { AuthContext } from '../../../context/auth.context'
import { Form, Button, Image } from 'react-bootstrap'
import { format } from "@formkit/tempo"
import CommunityService from './../../../services/community.services'

const CreatePostForm = ({ getUser }) => {
    const { user } = useContext(AuthContext)

    const [newPost, setNewPost] = useState({
        username: user._id,
        comment: '',
        date: format(new Date(), "full"),
    })

    const handleInputChange = (e) => {
        setNewPost({ ...newPost, comment: e.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        CommunityService
            .createPost(newPost)
            .then(response => {
                // Manejar la respuesta según sea necesario
                console.log("Publicación exitosa", response.data);
                // Actualizar datos del usuario después de realizar la publicación
                getUser();
            })
            .catch(error => {
                // Manejar el error según sea necesario
                console.error("Error al crear la publicación", error);
            });
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group className='form-appointment-group mb-4'>
                <Form.Label>Hola {user.username}</Form.Label>
                <Image className='w-50' src={user.imageUrl} roundedCircle />
                <Form.Control
                    placeholder="Comparte tus ideas"
                    as="textarea"
                    rows={3}
                    value={newPost.comment}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Button variant="warning" type="submit">Publicar</Button>
        </Form>
    )
}

export default CreatePostForm
