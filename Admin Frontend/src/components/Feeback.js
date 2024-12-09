import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCalendarAlt, FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // <-- Add this import

// Dummy data for feedbacks
const dummyMentorFeedbacks = [
  { id: 1, message: 'Great session on React!', sender: 'John Doe', field: 'Software Engineering' },
  { id: 2, message: 'The Data Science workshop was insightful.', sender: 'Jane Smith', field: 'Data Science' },
  { id: 3, message: 'Appreciate the focus on real-world use cases.', sender: 'Alice Johnson', field: 'Web Development' },
];

const dummyUserFeedbacks = [
  { id: 4, message: 'Loved the coding bootcamp!', sender: 'User A', field: 'Frontend Development' },
  { id: 5, message: 'Could we have more on ML topics?', sender: 'User B', field: 'Machine Learning' },
  { id: 6, message: 'Enjoyed the interactive sessions.', sender: 'User C', field: 'UX Design' },
];

const Feedback = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // Handle feedback selection
  const handleFeedbackClick = (feedback) => {
    setSelectedFeedback(feedback);
  };

  return (
    <div className="flex bg-gradient-to-b from-[#e1e7ff] to-[#ffffff] min-h-screen relative">
      {/* Sidebar Component */}
      <div className="w-64 bg-gradient-to-b from-[#4338CA] to-[#6D28D9] min-h-screen p-4 flex flex-col items-center shadow-lg transition-transform duration-300 ease-in-out">
        {[ 
          { label: 'Dashboard', icon: <FaUser />, path: '/' },
          { label: 'Mentor Management', icon: <FaChalkboardTeacher />, path: '/mentor-management' }, 
          { label: 'Pending Posts', icon: <FaCalendarAlt />, path: '/pending-posts' }, 
          { label: 'Feedback', icon: <FaClipboardList />, path: '/Feedbacks' },
        ].map((item, index) => (
          <Link key={index} to={item.path} className="w-full">
            <motion.button
              className="bg-[#ffffff] text-black px-4 py-3 rounded-lg mb-6 w-full font-semibold shadow-md flex items-center space-x-4 hover:bg-[#4338CA] transition-all"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 250 }}
            >
              {item.icon}
              <span>{item.label}</span>
            </motion.button>
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Feedbacks from Mentors */}
        <motion.div
          className="bg-[#ffffff] p-6 rounded-lg shadow-xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-semibold text-[#4338CA]">Mentor Feedbacks</h2>
          <div className="mt-4 max-h-64 overflow-y-auto space-y-4">
            {dummyMentorFeedbacks.map((feedback) => (
              <motion.div
                key={feedback.id}
                className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                onClick={() => handleFeedbackClick(feedback)}
              >
                <span className="font-semibold">{feedback.message}</span>
                <p className="text-sm text-gray-500">{`By: ${feedback.sender}`}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feedbacks from Users */}
        <motion.div
          className="bg-[#ffffff] p-6 rounded-lg shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-semibold text-[#4338CA]">User Feedbacks</h2>
          <div className="mt-4 max-h-64 overflow-y-auto space-y-4">
            {dummyUserFeedbacks.map((feedback) => (
              <motion.div
                key={feedback.id}
                className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                onClick={() => handleFeedbackClick(feedback)}
              >
                <span className="font-semibold">{feedback.message}</span>
                <p className="text-sm text-gray-500">{`By: ${feedback.sender}`}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Feedback Detail Pane */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            className="bg-white p-6 rounded-lg w-1/3 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold text-[#4338CA]">Feedback Detail</h3>
            <p className="mt-2 text-sm text-gray-500">{`From: ${selectedFeedback.sender}`}</p>
            <p className="mt-2 text-sm text-gray-500">{`Field: ${selectedFeedback.field}`}</p>
            <p className="mt-4 text-gray-700">{selectedFeedback.message}</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setSelectedFeedback(null)}
                className="bg-gray-500 text-white p-3 rounded-md"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
