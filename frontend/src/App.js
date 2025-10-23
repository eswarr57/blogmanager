// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import PostDetail from './components/posts/PostDetail';
import PostForm from './components/posts/PostForm';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {/* The route for viewing a single post */}
                    <Route path="/post/:id" element={<PostDetail />} />
                    {/* The route for creating a new post */}
                    <Route path="/new" element={<PostForm />} />
                    {/* Add a 404/NotFound page route here */}
                    {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
