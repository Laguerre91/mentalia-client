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
    const [deleted, setDeleted] = useState(false)

    const { user } = useContext(AuthContext)

    useEffect(() => {
        getAllRepliesForPost();
    }, [postId, deleted])


    const addReply = e => {

        e.preventDefault()

        CommunityService
            .addReply(postId, replyText, user._id)
            .then(() => {
                getAllRepliesForPost()
            })
            .catch(error => console.error('Error adding reply:', error))
    }


    const getAllRepliesForPost = () => {
        CommunityService
            .getAllRepliesForPost(postId)
            .then(response => setReplies(response.data))
            .catch(err => console.log(err))
    }

    const deletePost = () => {
        CommunityService
            .deletePost(postId)
            .then(() => {
                setDeleted(true)
            })
            .catch(err => console.log(err))
    }

    if (deleted) {
        return null
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
                        <Button className='btn-showReplies btn-community' onClick={() => setShowReplies(!showReplies)}>
                            {showReplies ? 'Ocultar comentarios' : 'Mostrar comentarios'}
                        </Button>
                        {showReplies && (
                            <ul className="list-unstyled mt-4">
                                {replies.map(reply => (
                                    <li key={reply._id} className='d-flex post-replies-list'>
                                        <Image className='post-reply-image me-2' src={reply.owner.imageUrl} alt={`Picture of ${reply.owner.username}`} roundedCircle />
                                        <div className='post-reply-section'>
                                            <strong className='post-reply-username'>{reply.owner.username}:</strong> {reply.reply}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
                <Button className='btn-deletePost' onClick={deletePost}>X</Button>
            </Card.Body>
            <hr />
            <Form className='addReply-form mb-4' onSubmit={addReply}>
                <Form.Group className='mb-2'>
                    <Form.Control
                        placeholder="Agrega un comentario"
                        as="textarea"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                    />
                </Form.Group>
                <Button className='btn-post btn-community' type='submit'>Comentar</Button>
            </Form>
        </Card>
    )
}

export default PostCard 
