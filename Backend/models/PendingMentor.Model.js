import mongoose from 'mongoose';

// Define the Achievement Schema
const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
    default: null,
  },
});

// Define the Resource Schema
const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['PDF', 'Video', 'Article'],
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  file: {
    type: String, // Optional file storage path or URL
    default: null,
  },
});

// Define the PendingMentor Schema
const pendingMentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, enum: ['PendingMentor'], required: true },  // Updated to 'PendingMentor'
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  expertise: {
    type: [String],
    enum: ['Business', 'Development', 'Cyber Security', 'Arts'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cv: {
    type: String, // Store the file path or URL of the CV
    required: true,
  },
  profileImage: {
    type: String, // Store the file path or URL for the profile image
    default: null, // Optional
  },
  achievements: [achievementSchema], // Embedded achievements
  resources: [resourceSchema], // Embedded resources
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', 
  }], 
  feedback: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback', // Reference to the Feedback model
  }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  
  createdAt: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],  // New status field to manage mentor approval
    default: 'Pending',
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create PendingMentor model
const PendingMentor = mongoose.model('PendingMentor', pendingMentorSchema);

export default PendingMentor;
