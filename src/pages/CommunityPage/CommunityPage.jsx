import React, { useState, useEffect, useContext } from "react";
import CreatePostForm from "../../components/Forms/CreatePostForm/CreatePostForm";
import PostCard from "../../components/PostCard/PostCard";
import CommunityService from './../../services/community.services'

import './CommunityPage.css'
import { AuthContext } from "../../context/auth.context";

const CommunityPage = ({ getUser }) => {
    const [posts, setPosts] = useState([])

    const { user } = useContext(AuthContext)

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
            .addReply(postId, replyText, user._id)
            .then(response => {
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
                    owner={post.owner}
                    comment={post.comment}
                    date={post.date}
                    onAddReply={addReply}
                />
            ))}
        </div>
    );
};

export default CommunityPage;
