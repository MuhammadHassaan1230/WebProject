import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Dashboard from './components/Dashboard'; // Correct path for Dashboard component
import MentorManagement from './components/MentorManagement'; // Import MentorManagement component
import PendingPosts from './components/PendingPosts'; // Import MentorManagement component
import Feedback from './components/Feeback'; // Import MentorManagement component


const App = () => {
  return (
    <Routes> {/* Use Routes for route handling */}
      {/* Route for the Dashboard component */}
      <Route path="/" element={<Dashboard />} /> 
      
      {/* Route for the MentorManagement componen */}
      <Route path="/mentor-management" element={<MentorManagement />} />
      
      <Route path="/pending-posts" element={<PendingPosts />} /> 
      <Route path="/Feedbacks" element={<Feedback />} /> 
    </Routes>
  );
};

export default App;
