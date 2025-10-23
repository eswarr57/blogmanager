// server.js
require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Define allowed origins for enhanced security
// Read allowed origins from an environment variable (comma-separated) if provided,
// otherwise fall back to a sensible default list.
const defaultAllowed = [
    'http://localhost:3000',
    'https://fullstack-2-ho88.onrender.com',
    // include the Vercel frontend domain used for production
    //'https://fullstack-22imhsj0a-dalli-sankars-projects.vercel.app'
];

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim()).filter(Boolean)
    : defaultAllowed;

console.log('CORS allowed origins:', allowedOrigins);

// Connect Database
connectDB();

// Middleware: Body Parser - allows us to get data in req.body
app.use(express.json({ extended: false }));

// 🚀 Configured CORS Middleware
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        // Also allow the request if the origin is explicitly in the allowed list
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log(`CORS Blocked: Origin ${origin} not allowed`);
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));

// Simple root route
app.get('/', (req, res) => res.send('Blog API Running'));

// Define Routes
app.use('/api/posts', require('./routes/postRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));