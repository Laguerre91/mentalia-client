import React, { useState, useEffect } from "react";
import CreatePostForm from "../../components/Forms/CreatePostForm/CreatePostForm";
import PostCard from "../../components/PostCard/PostCard";
import CommunityService from './../../services/community.services'

import { Row, Col } from "react-bootstrap";

import './CommunityPage.css'

const CommunityPage = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        getAllPosts()
    }, [])

    const getAllPosts = () => {
        CommunityService
            .getAllPosts()
            .then(response => setPosts(response.data))
            .catch(error => console.error("Error fetching posts:", error))
    }

    return (
        <div className="CommunityPage">

            <Row>
                <Col md={12}>
                    <CreatePostForm updatePosts={getAllPosts} />
                </Col>
            </Row>

            <h2>Publicaciones Recientes</h2>
            {
                posts.map(post => <PostCard key={post._id} {...post} />)
            }
        </div>
    );
};

export default CommunityPage;