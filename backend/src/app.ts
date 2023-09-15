import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db, { init as dbInit } from './database';
import authRoutes from './controllers/authController';
import profileRoutes from './controllers/profileController';
import { verifyToken } from './middleware/authMiddleware';
import userRoutes from './controllers/userController';

// Import routes and database initialization here

dbInit();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', verifyToken, profileRoutes);
app.use('/api/users', verifyToken, userRoutes);

export default app;
