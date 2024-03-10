import React from 'react'
import { Card, Badge } from 'react-bootstrap'

const PostCard = ({ username, comment, date }) => {

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <Badge bg="info" className="me-2">{username}</Badge>
                    {new Date(date).toLocaleDateString()} {new Date(date).toLocaleTimeString()}
                </Card.Title>
                <Card.Text>{comment}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default PostCard
