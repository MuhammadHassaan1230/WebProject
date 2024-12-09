import mongoose from 'mongoose';
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'authorModel'  // Dynamic reference based on author model (Student or Mentor)
  },
  authorModel: {
    type: String,
    required: true,
    enum: ['Student', 'Mentor'],  // Defines which model (Student or Mentor) the author belongs to
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Comment', CommentSchema);
