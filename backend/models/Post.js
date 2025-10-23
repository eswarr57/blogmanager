// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        trim: true
    },
    content: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        default: 'Your Name' 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
}, { 
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Post', PostSchema);