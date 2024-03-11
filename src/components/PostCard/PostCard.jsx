import React from 'react'
import { useState } from 'react'
import { Card, Badge, Form, Button } from 'react-bootstrap'

import './PostCard.css'

const PostCard = ({ postId, username, comment, date, replies, onAddReply }) => {

    const [replyText, setReplyText] = useState('');
    const [showReplies, setShowReplies] = useState(false);

    const handleAddReply = () => {
        onAddReply(postId, replyText);
        setReplyText('');
    }

    return (
        <Card className="PostCard mb-3 w-50">
            <Card.Body>
                <Card.Title className='post-title mb-4'>
                    <Badge bg="info" className="me-3">{username}</Badge>
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
                                        <strong>{reply.username.username}:</strong> {reply.comment}
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
