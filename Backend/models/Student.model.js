import mongoose from 'mongoose';

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

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Student'], required: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  highestQualification: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  institutionName: { type: String, required: true },
  yearOfPassing: { type: Number, required: true },
  cgpa: { type: Number, required: true },
  shortTermGoals: { type: String, required: true },
  longTermGoals: { type: String, required: true },
  idealJobRole: { type: String, required: true },
  profileImage: { type: String, default: null },
  achievements: [achievementSchema], 
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  
}, { timestamps: true });


const Student = mongoose.model('Student', studentSchema);

export default Student;
