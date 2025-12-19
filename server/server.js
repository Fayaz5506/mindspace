const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

dotenv.config();

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const journalRoutes = require('./routes/journalRoutes');
const moodRoutes = require('./routes/moodRoutes');
const goalRoutes = require('./routes/goalRoutes');
const meditationRoutes = require('./routes/meditationRoutes');
const communityRoutes = require('./routes/communityRoutes');
const insightRoutes = require('./routes/insightRoutes');

const app = express();

// Security Middleware
app.use(helmet()); // Set security HTTP headers
// app.use(mongoSanitize()); // Prevent NoSQL injection
// app.use(xss()); // Prevent XSS

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
// app.use('/api/', limiter);

// Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
app.use(express.json({ limit: '10kb' })); // Body limit to prevent DOS

const devOrigins = ['http://localhost:5173', 'http://localhost:5174'];
const allowedOrigin = process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : devOrigins;

app.use(cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Ensure preflight requests are handled: echo allowed origin and respond to OPTIONS
app.use((req, res, next) => {
    const origin = req.headers.origin;
    const isAllowed = (Array.isArray(allowedOrigin) && allowedOrigin.includes(origin)) || origin === allowedOrigin;
    if (isAllowed) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

// Connect Database
connectDB();

app.get('/', (req, res) => {
    res.send('MindSpace API is running...');
});

// Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/meditations', meditationRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/insights', insightRoutes);

// Server Frontend in Production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    // Set static folder
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('MindSpace API is running...');
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
