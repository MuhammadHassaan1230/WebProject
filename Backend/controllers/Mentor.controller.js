import Mentor from '../models/Mentor.Model.js';
import Event from '../models/Event.Model.js';
import bcrypt from 'bcrypt';
import { processFiles, processFile, cleanupTempFiles } from '../utils/fileHelpers.js';
import Student from '../models/Student.model.js';
import jwt from 'jsonwebtoken';

// Create Mentor
export const createMentor = async (req, res) => {
  console.log(req.body);
  const { email, password, ...mentorData } = req.body;
    try{
    const existingMentor = await Mentor.findOne({ email });
    if (existingMentor) {
      cleanupTempFiles(req.files);
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create mentor first to get the ID
    const mentor = new Mentor({
      ...mentorData,
      email,
      password: hashedPassword,
      role: 'Mentor'
    });

    // Process uploaded files
    const processedFiles = processFiles(req.files, mentor._id);
    
    if (!processedFiles.cv) {
      cleanupTempFiles(req.files);
      return res.status(400).json({ message: 'CV file is required' });
    }

    // Update mentor with file URLs
    mentor.cv = processedFiles.cv[0].url;
    if (processedFiles.profileImage) {
      mentor.profileImage = processedFiles.profileImage[0].url;
    }

    await mentor.save();
    
    const token = jwt.sign({ id: mentor._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    const mentorResponse = mentor.toObject();
    delete mentorResponse.password;

    res.status(201).json({ 
      mentor: mentorResponse, 
      token 
    });
  } catch (error) {
    cleanupTempFiles(req.files);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const mentor = await Mentor.findOne({ email });
    const student = await Student.findOne({ email });

    let user;
    if (mentor) {
      user = mentor;
    } else if (student) {
      user = student;
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const token = jwt.sign({ id: user._id, role: user.constructor.modelName }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

   
    const userResponse = user.toObject();
    delete userResponse.password;

  
    res.json({
      user: userResponse,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get All Mentors
export const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json({ success: true, data: mentors });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get Mentor by ID
export const getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id).populate('events feedback posts');
    if (!mentor) return res.status(404).json({ success: false, message: 'Mentor not found' });
    res.status(200).json({ success: true, data: mentor });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


export const updateMentor = async (req, res) => {
  try {
    const { name, email, city, linkedin, description, id } = req.body;
    const profileImage = req.file ? req.file.path : null; // Use new file if uploaded

    if (!name || !email || !city || !linkedin || !description || !id) {
      return res.status(400).send('Missing required fields');
    }

    // Assuming you're using MongoDB (adjust this based on your DB)
    const updatedMentor = await Mentor.findByIdAndUpdate(id, {
      name,
      email,
      city,
      linkedin,
      description,
      profileImage,
    }, { new: true });

    res.status(200).json(updatedMentor); // Send the updated mentor data
  } catch (error) {
    console.error('Error in updateMentor:', error);
    res.status(500).send('An error occurred while updating the profile');
  }
};




 // Adjust the path as necessary

export const addAchievement = async (req, res) => {

  try {
    const { title, description, date } = req.body;

    // Validate input fields
    if (!title || !description || !date) {
      return res.status(400).json({ 
        message: 'All fields (title, description, date) are required.' 
      });
    }

    // Find the mentor by ID
    const mentor = await Mentor.findById(req.mentor.id);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found.' });
    }

    // Prepare the new achievement
    const newAchievement = {
      title,
      description,
      date: new Date(date), // Ensure the date is properly formatted
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    };

    await Mentor.findByIdAndUpdate(
      req.mentor.id,
      { $push: { achievements: newAchievement } },
      { new: true }
    );

    // Save the updated mentor document
    await mentor.save();

    // Respond with success
    res.status(201).json({
      message: 'Achievement added successfully.',
      achievement: newAchievement,
    });
  } catch (error) {
    console.error('Error adding achievement:', error);
    res.status(500).json({
      message: 'An error occurred while adding the achievement.',
      error: error.message,
    });
  }
};



export const deleteAchievement = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ success: false, message: 'Mentor not found' });

    mentor.achievements.id(req.params.achievementId).remove();
    await mentor.save();

    res.status(200).json({ success: true, message: 'Achievement deleted successfully', data: mentor });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};



export const addResource = async (req, res) => {
  console.log(req.body);
  try {
   
    const { title, type, link } = req.body;
    const file = req.file;

   
    if (!title || (!link && !file)) {
      return res.status(400).json({
        success: false,
        message: 'Title and either a link or a file are required.',
      });
    }


    const validTypes = ['PDF', 'Video', 'Article'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid type. Allowed types are: ${validTypes.join(', ')}`,
      });
    }

   
    const newResource = {
      title,
      type,
      link: link || null,
      file: file ? file.path : null,
    };

    
    const mentorId = req.mentor?.id; 
    if (!mentorId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Mentor ID is required.',
      });
    }

    const updatedMentor = await Mentor.findByIdAndUpdate(
      mentorId,
      { $push: { resources: newResource } },
      { new: true, runValidators: true } 
    );

    if (!updatedMentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found.',
      });
    }

   console.log(newResource);
    res.status(201).json({
      success: true,
      message: 'Resource added successfully.',
      data: newResource,
    });
  } catch (error) {
    console.error('Error adding resource:', error);

    res.status(500).json({
      success: false,
      message: 'An error occurred while adding the resource. Please try again later.',
      error: error.message,
    });
  }
};

export const getResources = async (req, res) => {
  console.log('Fetching resources for mentor');

  const mentorId = req.user.id;
try {
    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      return res.status(400).json({ message: "Invalid mentor ID." });
    }

    
    const mentor = await Mentor.findById(mentorId).populate('resources');

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found." });
    }

    res.status(200).json(mentor.resources);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ success: false, message: 'Mentor not found' });

    mentor.resources.id(req.params.resourceId).remove();
    await mentor.save();

    res.status(200).json({ success: true, message: 'Resource deleted successfully', data: mentor });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


export const AddEvent = async (req, res) => {
  try {
    const { title, description, date, location, link } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ message: 'All fields (title, description, date) are required.' });
    }

    const newEvent = new Event({
      title,
      description,
      link,
      location,
      date: new Date(date),
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });

    
    await newEvent.save();

    const mentorId = req.mentor?.id;
    if (!mentorId) {
      return res.status(401).json({ message: 'Unauthorized. Mentor ID is required.' });
    }

    const updatedMentor = await Mentor.findByIdAndUpdate(
      mentorId,
      { $push: { events: newEvent._id } }, 
      { new: true }
    );

    if (!updatedMentor) {
      return res.status(404).json({ message: 'Mentor not found.' });
    }

    res.status(201).json({ message: 'Event added successfully.', data: newEvent });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ message: 'An error occurred while adding the event.', error: error.message }); 
  }
};

