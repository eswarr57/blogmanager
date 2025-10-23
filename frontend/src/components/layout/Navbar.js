// src/components/layout/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderBottom: '1px solid #eee',
    marginBottom: '20px'
};

const Navbar = () => {
    return (
        <nav style={navStyle}>
            <h1>
                <Link to="/">Personal Blog</Link>
            </h1>
            <div>
                <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
                <Link to="/new">Create Post</Link>
            </div>
        </nav>
    );
};

export default Navbar;