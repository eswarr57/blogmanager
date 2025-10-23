// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// @route   POST /api/posts
// @desc    Create a new post
// @access  Public (In a real app, this should be Private/Admin protected)
router.post('/', async (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content) {
        return res.status(400).json({ msg: 'Please enter a title and content for the post.' });
    }

    try {
        const newPost = new Post({
            title,
            content,
            author: author || 'Admin' 
        });

        const post = await newPost.save();
        res.status(201).json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/posts
// @desc    Get all posts, sorted by newest first
// @access  Public
router.get('/', async (req, res) => {
    try {
        // Find all posts and sort them by date descending (-1)
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/posts/:id
// @desc    Get a single post by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        // If the ID format is invalid (e.g., not a 24-char hex string)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Note: Add PUT (update) and DELETE routes here for a complete application
// ...

module.exports = router;