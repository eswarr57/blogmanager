// ==========================
// server.js - Blog Manager Backend
// ==========================

require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// ==========================
// Allowed Origins (CORS)
// ==========================
const defaultAllowed = [
    'http://localhost:3000',               // local frontend
    'https://fullstack-2-ho88.onrender.com', // previous frontend
    'https://myblog-frontend.onrender.com'   // your live frontend
];

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim()).filter(Boolean)
    : defaultAllowed;

console.log('CORS allowed origins:', allowedOrigins);

// ==========================
// Connect Database
// ==========================
connectDB();

// ==========================
// Middleware
// ==========================
app.use(express.json({ extended: false }));

app.use(cors({
    origin: (origin, callback) => {
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

// ==========================
// Routes
// ==========================
app.get('/', (req, res) => res.send('Blog API Running'));
app.use('/api/posts', require('./routes/postRoutes'));

// ==========================
// Server Start
// ==========================
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

app.listen(PORT, () => console.log(`Server started at ${BASE_URL}`));
