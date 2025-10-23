// ==========================
// server.js - Blog Manager Backend
// ==========================

require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');

const app = express();

// ==========================
// Environment & CORS Setup
// ==========================
const isDev = process.env.NODE_ENV !== 'production';

// Read allowed origins from environment variable
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [];

console.log('CORS allowed origins:', allowedOrigins);
console.log('Running in', isDev ? 'development' : 'production', 'mode');

// ==========================
// Connect Database
// ==========================
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// ==========================
// Middleware
// ==========================
app.use(express.json());

// Dynamic CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman) or in dev
    if (isDev || !origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS Blocked: Origin ${origin} not allowed`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

// ==========================
// Routes
// ==========================
app.get('/', (req, res) => res.send('Blog API Running'));
app.use('/api/posts', postRoutes);

// ==========================
// Server Start
// ==========================
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

app.listen(PORT, () => console.log(`🚀 Server running at ${BASE_URL}`));
