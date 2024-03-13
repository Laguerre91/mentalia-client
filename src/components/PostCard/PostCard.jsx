import React, { useContext, useState, useEffect } from 'react';
import { Card, Badge, Form, Button, Image } from 'react-bootstrap';
import CommunityService from './../../services/community.services';
import { AuthContext } from '../../context/auth.context';
import ReplyCard from './../ReplyCard/ReplyCard';

import * as Icon from 'react-bootstrap-icons'

import './PostCard.css';

const PostCard = ({ _id: postId, owner, comment, date }) => {
    const [replyText, setReplyText] = useState('');
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState([]);
    const [deleted, setDeleted] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        getAllRepliesForPost();
    }, [postId, deleted]);

    const addReply = (e) => {
        e.preventDefault();

        CommunityService.addReply(postId, replyText, user._id)
            .then(() => {
                getAllRepliesForPost();
                setReplyText('')
            })
            .catch((error) => console.error('Error adding reply:', error));
    };

    const getAllRepliesForPost = () => {
        CommunityService.getAllRepliesForPost(postId)
            .then((response) => setReplies(response.data))
            .catch((err) => console.log(err));
    };

    const deletePost = () => {
        CommunityService.deletePost(postId)
            .then(() => {
                setDeleted(true);
            })
            .catch((err) => console.log(err));
    };

    const onDeleteReply = (deletedReplyId) => {
        const updatedReplies = replies.filter((reply) => reply._id !== deletedReplyId);
        setReplies(updatedReplies);
    }

    if (deleted) {
        return null;
    }

    return (
        <Card className='PostCard mb-3'>
            <Card.Body>
                <Card.Title className='post-title mb-4'>
                    <Image className='post-user-img' src={owner.imageUrl} roundedCircle />
                    <Badge bg='dark' className='post-username me-3 ms-3'>
                        {owner.username}
                    </Badge>
                    <p className='post-date ms-auto p-2'>{date}</p>
                </Card.Title>
                <Card.Text className='post-text'>{comment}</Card.Text>

                {replies.length > 0 && (
                    <>
                        <Button className='btn-showReplies btn-community' onClick={() => setShowReplies(!showReplies)}>
                            {showReplies ? 'Ocultar comentarios' : 'Mostrar comentarios'}
                        </Button>
                        {showReplies && (
                            <ul className='list-unstyled mt-4'>
                                {replies.map((reply) => (
                                    <ReplyCard key={reply._id} reply={reply} onDeleteReply={onDeleteReply} />
                                ))}
                            </ul>
                        )}
                    </>
                )}
                <Icon.Trash3Fill
                    onClick={deletePost}
                    color='Crimson'
                    size={22} />
            </Card.Body>
            <hr />
            <Form className='addReply-form mb-4' onSubmit={addReply}>
                <Form.Group className='mb-2'>
                    <Form.Control placeholder='Agrega un comentario' as='textarea' value={replyText} onChange={(e) => setReplyText(e.target.value)} />
                </Form.Group>
                <Button className='btn-post btn-community' type='submit'>
                    Comentar
                </Button>
            </Form>
        </Card>
    );
};

export default PostCard;
