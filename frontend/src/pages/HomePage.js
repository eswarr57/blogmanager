// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import PostCard from '../components/posts/PostCard';
import { fetchPosts } from '../api/postApi';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                setPosts(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load posts. Is the backend running?");
                setLoading(false);
            }
        };
        loadPosts();
    }, []);

    if (loading) return <h2 style={{ textAlign: 'center' }}>Loading Posts...</h2>;
    if (error) return <h2 style={{ color: 'red', textAlign: 'center' }}>Error: {error}</h2>;

    return (
        <div>
            <h1>Recent Blog Posts</h1>
            {posts.length === 0 ? (
                <p>No posts available yet. Be the first to create one!</p>
            ) : (
                posts.map(post => (
                    <PostCard key={post._id} post={post} />
                ))
            )}
        </div>
    );
};

export default HomePage;