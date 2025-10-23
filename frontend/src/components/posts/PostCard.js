// src/components/posts/PostCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const cardStyle = {
    border: '1px solid #ddd',
    padding: '20px',
    marginBottom: '15px',
    borderRadius: '4px',
    backgroundColor: '#fff'
};

const PostCard = ({ post }) => {
    // Helper to shorten content for the card
    const snippet = post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '');

    return (
        <div style={cardStyle}>
            <h2>
                <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h2>
            <small>
                Published on: {new Date(post.date).toLocaleDateString()}
            </small>
            <p>{snippet}</p>
        </div>
    );
};

export default PostCard;