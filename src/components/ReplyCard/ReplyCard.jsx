import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import CommunityService from './../../services/community.services';

import './ReplyCard.css'
import { AuthContext } from "../../context/auth.context";


const ReplyCard = ({ reply, onDeleteReply }) => {

    const { user } = useContext(AuthContext)

    const deleteReply = () => {
        if (user && reply.owner._id === user._id) {
            CommunityService.deleteReply(reply._id)
                .then(() => {
                    onDeleteReply(reply._id);
                })
                .catch((err) => console.log(err));
        }
    }

    const renderDeleteButton = user && reply.owner._id === user._id && (
        <p onClick={deleteReply} className="btn-delete-icon ms-auto">Eliminar</p>
    );


    return (
        <li className='d-flex post-replies-list'>
            <img className='post-reply-image me-2' src={reply.owner.imageUrl} alt={`Picture of ${reply.owner.username}`} />
            <div className='d-flex flex-column post-reply-section'>
                <strong className='post-reply-username mb-1'>{reply.owner.username}</strong>
                <p className="mb-0">{reply.reply}</p>
                {renderDeleteButton}
            </div>
        </li>
    );
}

export default ReplyCard;
