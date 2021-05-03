import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import errorHandler from './middleware/error.js'

dotenv.config({ path: '../config.env' });

const app = express();
import connectDB from './database/connection.js';
import authRoutes from './routes/auth.js';
import privateRoutes from './routes/private.js';

const PORT = process.env.PORT || 5000 ;

// Log request
app.use(morgan('tiny'));

// MongoDB connection
connectDB();

// Parse request to body-parse
app.use(bodyParser.json({ extended: true, limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(cors());

// Set view engine
app.set("view engine", "ejs");

// Load routes
app.use('/api/auth', authRoutes);
app.use ('/api/private', privateRoutes);

// Error handler should be the lasy piece of middleware
app.use(errorHandler);

const server = app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));

process.on("unhandledRejection", (err, promise) => {
    console.log(`Looged Error: ${err}`);
    server.close(() => process.exit(1));
})