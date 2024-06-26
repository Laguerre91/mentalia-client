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
            .then(response => {
                const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts);
            })
            .catch(error => console.error("Error fetching posts:", error))
    }

    return (
        <div className="CommunityPage">
            <CreatePostForm updatePosts={getAllPosts} />

            <div className="posts-list">
                {
                    posts.map(post => <PostCard key={post._id} {...post} />)
                }
            </div>
        </div>
    );
};

export default CommunityPage;