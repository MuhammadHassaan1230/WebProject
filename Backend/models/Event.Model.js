import mongoose from 'mongoose';


const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String, 
    required: true,
  },
  imageUrl: {
    type: String,
    default: null,
  },
}, {
  timestamps: true, 
});

// Create Event model
const Event = mongoose.model('Event', eventSchema);

export default  Event;
