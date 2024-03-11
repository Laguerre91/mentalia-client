import React, { useState, useEffect } from "react";
import CreatePostForm from "../../components/Forms/CreatePostForm/CreatePostForm";
import PostCard from "../../components/PostCard/PostCard";
import CommunityService from './../../services/community.services'
import UserDetails from "../../components/UserDetails/UserDetails";

import './CommunityPage.css'

const CommunityPage = ({ getUser }) => {
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

    const updatePosts = () => {
        getAllPosts()
    }

    const addReply = (postId, replyText) => {
        CommunityService
            .addReply(postId, replyText)
            .then(response => {
                console.log('Reply added:', response.data);
                getAllPosts();
            })
            .catch(error => console.error('Error adding reply:', error));
    }

    return (
        <div className="CommunityPage">

            <CreatePostForm getUser={getUser} updatePosts={updatePosts} />

            <h2>Publicaciones Recientes</h2>
            {posts.map(post => (
                <PostCard
                    key={post._id}
                    postId={post._id}
                    username={post.username.username}
                    comment={post.comment}
                    date={post.date}
                    replies={post.replies}
                    onAddReply={addReply}
                />
            ))}
        </div>
    );
};

export default CommunityPage;
