// src/components/posts/PostForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../api/postApi';

const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' };
const buttonStyle = { padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!title || !content) {
            setError("Title and content are required.");
            return;
        }

        try {
            // Note: The backend POST route needs to be implemented for this to work
            const newPost = await createPost({ title, content });
            navigate(`/post/${newPost._id}`);
        } catch (err) {
            setError("Failed to create post. Check console and backend status.");
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <input
                    type="text"
                    placeholder="Post Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={inputStyle}
                    required
                />
                
                <textarea
                    placeholder="Post Content (supports markdown/plain text)"
                    rows="15"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={inputStyle}
                    required
                />
                
                <button type="submit" style={buttonStyle}>
                    Publish Post
                </button>
            </form>
        </div>
    );
};

export default PostForm;