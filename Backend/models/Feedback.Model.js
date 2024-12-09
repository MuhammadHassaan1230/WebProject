import mongoose from 'mongoose';

// Define the Feedback Schema
const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Rating must be between 1 and 5
  },
  dateCreated: {
    type: Date,
    default: Date.now, // Default to the current date and time
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor', // Reference to the Mentor model (if feedback is for a mentor)
    default: null,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model (if feedback is for a student)
    default: null,
  },
});

// Create the Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
