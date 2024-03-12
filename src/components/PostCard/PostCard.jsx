import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { Card, Badge, Form, Button, Image } from 'react-bootstrap'
import CommunityService from './../../services/community.services'

import './PostCard.css'
import { AuthContext } from '../../context/auth.context'

const PostCard = ({ _id: postId, owner, comment, date }) => {

    const [replyText, setReplyText] = useState('')
    const [showReplies, setShowReplies] = useState(false)
    const [replies, setReplies] = useState([])

    const { user } = useContext(AuthContext)

    useEffect(() => {
        getAllRepliesForPost();
    }, [postId])


    const addReply = e => {

        e.preventDefault()

        CommunityService
            .addReply(postId, replyText, user._id)
            .then(() => {
                getAllRepliesForPost();
            })
            .catch(error => console.error('Error adding reply:', error));
    }


    const getAllRepliesForPost = () => {
        CommunityService
            .getAllRepliesForPost(postId)
            .then(response => setReplies(response.data))
            .catch(err => console.log(err))
    }


    return (
        <Card className="PostCard mb-3">
            <Card.Body>
                <Card.Title className='post-title mb-4'>
                    <Image className='post-user-img' src={owner.imageUrl} roundedCircle />
                    <Badge bg='dark' className="post-username me-3 ms-3">{owner.username}</Badge>
                    <p className='post-date ms-auto p-2'>{date}</p>
                </Card.Title>
                <Card.Text className='post-text'>{comment}</Card.Text>

                {replies.length > 0 && (
                    <>
                        <Button variant="link" onClick={() => setShowReplies(!showReplies)}>
                            {showReplies ? 'Ocultar comentarios' : 'Mostrar comentarios'}
                        </Button>
                        {showReplies && (
                            <ul className="list-unstyled mt-4">
                                {replies.map(reply => (
                                    <li key={reply._id}>
                                        <Image className='post-reply-image me-2' src={reply.owner.imageUrl} alt={`Picture of ${reply.owner.username}`} roundedCircle />
                                        <strong className='post-reply-username'>{reply.owner.username}:</strong> {reply.reply}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}

            </Card.Body>
            <hr />
            <Form className=' mb-4' onSubmit={addReply}>
                <Form.Group className='form-appointment-group mb-2'>
                    <Form.Control
                        placeholder="Agrega un comentario"
                        as="textarea"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                    />
                </Form.Group>
                <Button className='btn-post' type='submit'>Comentar</Button>
            </Form>
        </Card>
    )
}

export default PostCard 
