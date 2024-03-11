import React from 'react'
import { Card, Badge, Form, Button } from 'react-bootstrap'

import './PostCard.css'

const PostCard = ({ username, comment, date }) => {

    return (
        <Card className="PostCard mb-3 w-50">
            <Card.Body>
                <Card.Title className='post-title mb-4'>
                    <Badge bg="info" className="me-3">{username}</Badge>
                    {date}
                </Card.Title>
                <Card.Text className='post-text'>{comment}</Card.Text>
            </Card.Body>
            <hr />
            <Form className=' mb-4'>
                <Form.Group className='form-appointment-group mb-2'>

                    <Form.Control
                        placeholder="Agrega un comentario"
                        as="textarea"


                    />
                </Form.Group>
                <Button className='btn-post' type="submit">Comentar</Button>
            </Form>
        </Card>
    )
}

export default PostCard 
