import  mongoose from 'mongoose';

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
    
  },
  file: {
    type: String, 
    default: null,
  },
});

// Define the Mentor Schema
const mentorSchema = new mongoose.Schema({
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
  role: { type: String, enum: ['Mentor'], required: true },
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
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create Mentor model
const Mentor = mongoose.model('Mentor', mentorSchema);

export default Mentor;
