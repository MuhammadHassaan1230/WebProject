import express from 'express';  // Add this line to import express
import { getAllPosts, getPostById, createPost, deletePost } from '../controllers/Post.Controller.js';

const router = express.Router();

// Define the routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.delete('/:id', deletePost);

export default router;
