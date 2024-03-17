import { useState, useContext } from 'react'
import { AuthContext } from '../../../context/auth.context'
import { Form, Button } from 'react-bootstrap'
import { format } from "@formkit/tempo"
import CommunityService from './../../../services/community.services'

import './CreatePostForm.css'

const CreatePostForm = ({ updatePosts }) => {
    const { user } = useContext(AuthContext)

    const initialPostState = {
        owner: user._id,
        comment: '',
        date: format(new Date(), "full"),
    }

    const [newPost, setNewPost] = useState(initialPostState)

    const handleInputChange = (e) => {
        setNewPost({ ...newPost, comment: e.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        CommunityService
            .createPost(newPost)
            .then(response => {
                updatePosts()
                resetForm()
            })
            .catch(error => {
                console.error("Error al crear la publicación", error);
            });
    }

    const resetForm = () => {
        setNewPost(initialPostState);
    }

    return (
        <Form onSubmit={handleFormSubmit} className='form-addPost mb-5'>
            <Form.Group className='form-appointment-group mb-2'>
                <Form.Label className='form-addPost-username'>¡Hola, {user.username}!</Form.Label>
                <Form.Control
                    className='form-textArea'
                    placeholder="Comparte tus ideas con la comunidad"
                    as="textarea"
                    value={newPost.comment}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Button className='btn-post btn-community' type="submit">Publicar</Button>
        </Form>
    )
}

export default CreatePostForm
