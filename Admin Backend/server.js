// backend/server.js

import express from 'express';
import dotenv from 'dotenv'; 
import connectDB from './config/db.js'; // Add .js extension here
import postRoutes from './routes/Post.Route.js'; // Add .js extension here
import cors from 'cors';


dotenv.config();

const app = express();

// Connect to the MongoDB database
connectDB();
app.use(cors());
app.use(express.static('public')); // To parse JSON request bodies

// API Routes
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
