import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
// Passport (Google OAuth)
import passport from 'passport';
import './config/passport.js'; // registers Google strategy


// Import Config
import config from './config/config.js';

// Import Routes


// Import Middleware
import { errorHandler } from './middlewares/error.handler.js';
import { apiLimiter } from "./middlewares/ratelimit.middleware.js";


// Initialize app
const app = express();

app.use(express.static("public"))
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: config.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(apiLimiter);
app.use(passport.initialize());


// Routes
import authRouter from './routes/auth.route.js';

// Routes
app.use('/auth', authRouter);


// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'EMS Backend is running' });
});

// Error handling
app.use(errorHandler);



export default app;