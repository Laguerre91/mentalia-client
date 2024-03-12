import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Badge, Form, Button } from 'react-bootstrap'
import CommunityService from './../../services/community.services'

import './PostCard.css'

const PostCard = ({ postId, owner, comment, date, onAddReply }) => {

    const [replyText, setReplyText] = useState('')
    const [showReplies, setShowReplies] = useState(false)
    const [replies, setReplies] = useState([])

    useEffect(() => {
        // Fetch replies when the component mounts
        getAllRepliesForPost(postId);
    }, [postId]);


    const handleAddReply = () => {
        getAllRepliesForPost(postId)
        setReplyText('')
    }

    const getAllRepliesForPost = (postId) => {
        CommunityService
            .getAllRepliesForPost(postId)
            .then(response => setReplies(response.data))
            .catch(err => console.log(err))
    }

    return (
        <Card className="PostCard mb-3 w-50">
            <Card.Body>
                <Card.Title className='post-title mb-4'>
                    <Badge bg="info" className="me-3">{owner.username}</Badge>
                    {date}
                </Card.Title>
                <Card.Text className='post-text'>{comment}</Card.Text>

                {replies.length > 0 && (
                    <>
                        <Button variant="link" onClick={() => setShowReplies(!showReplies)}>
                            {showReplies ? 'Ocultar comentarios' : 'Mostrar comentarios'}
                        </Button>
                        {showReplies && (
                            <ul className="list-unstyled">
                                {replies.map(reply => (
                                    <li key={reply._id}>
                                        <strong>{reply.owner.username}:</strong> {reply.reply}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}

            </Card.Body>
            <hr />
            <Form className=' mb-4'>
                <Form.Group className='form-appointment-group mb-2'>
                    <Form.Control
                        placeholder="Agrega un comentario"
                        as="textarea"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                    />
                </Form.Group>
                <Button className='btn-post' onClick={handleAddReply}>Comentar</Button>
            </Form>
        </Card>
    )
}

export default PostCard 
