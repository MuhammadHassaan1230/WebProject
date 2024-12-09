import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';  // Install uuid package to generate unique ids

const { Schema } = mongoose;

const PostSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => uuidv4(),  // Generate a unique UUID by default
  },
  author: {
    type: String,
    required: true,
  },
  authorModel: {
    type: String,
    required: true,
    enum: ['Student', 'Mentor'],
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);
