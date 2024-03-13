import React, { useState } from "react";
import { Image } from "react-bootstrap";
import CommunityService from './../../services/community.services';

import './ReplyCard.css'

import * as Icon from 'react-bootstrap-icons'

const ReplyCard = ({ reply, onDeleteReply }) => {

    const deleteReply = () => {
        CommunityService.deleteReply(reply._id)
            .then(() => {
                onDeleteReply(reply._id);
            })
            .catch((err) => console.log(err));
    };

    return (
        <li className='d-flex post-replies-list'>
            <Image className='post-reply-image me-2' src={reply.owner.imageUrl} alt={`Picture of ${reply.owner.username}`} roundedCircle />
            <div className='d-flex flex-column post-reply-section'>
                <strong className='post-reply-username mb-1'>{reply.owner.username}</strong>
                <p className="mb-0">{reply.reply}</p>
                <p
                    onClick={deleteReply}
                    className="btn-delete-icon ms-auto">Eliminar</p>
            </div>
        </li>
    );
}

export default ReplyCard;
