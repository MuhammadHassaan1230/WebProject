import Post from '../models/Post.Model.js';

// Get all posts without population
export const getAllPosts = async (req, res) => {
  try {
    // Fetch all posts without using populate (no author resolution)
    const posts = await Post.find();  
    return res.status(200).json(posts);  // Return posts as JSON
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ message: 'Error fetching posts', error });
  }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching post', error });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content, author, authorModel } = req.body;
    const newPost = new Post({ title, content, author, authorModel });
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating post', error });
  }
};

// Update a post by ID
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating post', error });
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(200).json({ message: 'Post successfully deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting post', error });
  }
};
