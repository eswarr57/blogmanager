// src/components/posts/PostDetail.js
import React, { useState, useEffect } from 'react'; // <-- FIXED: changed '=>' to 'from'
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../../api/postApi';

const PostDetail = () => {
    const { id } = useParams(); // Gets the ID from the URL parameter
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const data = await fetchPostById(id);
                setPost(data);
                setLoading(false);
            } catch (err) {
                setError("Post not found or network error.");
                setLoading(false);
            }
        };
        loadPost();
    }, [id]);

    if (loading) return <h2 style={{ textAlign: 'center' }}>Loading Post...</h2>;
    if (error) return <h2 style={{ color: 'red', textAlign: 'center' }}>Error: {error}</h2>;
    if (!post) return <h2 style={{ textAlign: 'center' }}>Post not found.</h2>;

    return (
        <div>
            <h1>{post.title}</h1>
            <small>
                By {post.author || 'Admin'} on {new Date(post.date).toLocaleDateString()}
            </small>
            <hr />
            {/* Simple display of content - use a richer text component for actual HTML rendering */}
            <div style={{ lineHeight: '1.8' }}>
                <p>{post.content}</p>
            </div>
        </div>
    );
};

export default PostDetail;