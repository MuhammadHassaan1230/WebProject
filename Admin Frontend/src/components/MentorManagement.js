
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FaSearch, FaUser, FaChalkboardTeacher, FaClipboardList, FaCalendarAlt, FaRegTrashAlt } from 'react-icons/fa';


const dummyMentors = [
  { name: 'Mentor A', career: 'Software Engineering', achievements: 'Built 10+ apps, 5 years of experience', id: 1 },
  { name: 'Mentor B', career: 'Data Science', achievements: 'Led AI projects for 3 years', id: 2 },
  { name: 'Mentor C', career: 'Web Development', achievements: 'Full-stack expertise, over 8 years of experience', id: 3 },
  { name: 'Mentor D', career: 'Machine Learning', achievements: 'Specialized in deep learning algorithms', id: 4 },
  { name: 'Mentor E', career: 'Product Management', achievements: 'Launched 20+ products in tech startups', id: 5 },
];

const MentorManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mentors, setMentors] = useState(dummyMentors);
  const [selectedMentor, setSelectedMentor] = useState(null);

  // Separate categories (using states)
  const [topContributors, setTopContributors] = useState(dummyMentors.slice(0, 3));
  const [oldestMentors, setOldestMentors] = useState(dummyMentors.slice(3, 6));
  const [requestsFromUsers, setRequestsFromUsers] = useState(dummyMentors.slice(0, 3));

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleApproveRequest = (mentorId) => {
    // Simulate approval (e.g., could send to a backend here)
    alert(`Approved request for Mentor ID: ${mentorId}`);
    setSelectedRequest(null);  // Close the pane after approval
  };

  const handleDeclineRequest = (mentorId) => {
    // Simulate decline (e.g., could send to a backend here)
    alert(`Declined request for Mentor ID: ${mentorId}`);
    setSelectedRequest(null);  // Close the pane after decline
  };

  // Filter mentors based on search query
  const filterMentors = (mentors) => {
    return mentors.filter((mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Show mentor details in modal
  const handleShowDetails = (mentor) => {
    setSelectedMentor(mentor);
  };

  // Delete mentor from a specific category
  const handleDeleteMentor = (mentorId, category) => {
    if (category === 'topContributors') {
      setTopContributors((prev) => prev.filter((mentor) => mentor.id !== mentorId));
    } else if (category === 'oldestMentors') {
      setOldestMentors((prev) => prev.filter((mentor) => mentor.id !== mentorId));
    } else if (category === 'requestsFromUsers') {
      setRequestsFromUsers((prev) => prev.filter((mentor) => mentor.id !== mentorId));
    } else {
      setMentors((prevMentors) => prevMentors.filter((mentor) => mentor.id !== mentorId));
    }
  };

  return (
    <div className="flex bg-gradient-to-b from-[#e1e7ff] to-[#ffffff] min-h-screen relative">
      {/* Sidebar Component */}
      <div className="w-64 bg-gradient-to-b from-[#4338CA] to-[#6D28D9] min-h-screen p-4 flex flex-col items-center shadow-lg transition-transform duration-300 ease-in-out">
        {[
         { label: 'Dashboard', icon: <FaUser />, path: '/' },
         { label: 'Mentor Management', icon: <FaChalkboardTeacher />, path: '/mentor-management' }, // Updated with routing path
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
      
      <div className="flex-1 p-8">
        {/* Mentor Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Top Contributors Box */}
          <motion.div
            className="bg-[#ffffff] p-6 rounded-lg shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xl font-semibold text-[#4338CA]">Top Contributors</h3>

            {/* Mentors List */}
            <div className="mt-4 space-y-4">
              {topContributors.map((mentor) => (
                <div key={mentor.id} className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-bold">{mentor.name}</span>
                    <span>{mentor.career}</span>
                    <span className="text-sm text-gray-500">{mentor.achievements}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="bg-[#6D28D9] text-white p-2 rounded-md"
                      onClick={() => handleShowDetails(mentor)}
                    >
                      Show Details
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded-md"
                      onClick={() => handleDeleteMentor(mentor.id, 'topContributors')}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Oldest Mentors Box */}
          <motion.div
            className="bg-[#ffffff] p-6 rounded-lg shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xl font-semibold text-[#4338CA]">Oldest Mentors</h3>

            {/* Mentors List */}
            <div className="mt-4 space-y-4">
              {oldestMentors.map((mentor) => (
                <div key={mentor.id} className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-bold">{mentor.name}</span>
                    <span>{mentor.career}</span>
                    <span className="text-sm text-gray-500">{mentor.achievements}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="bg-[#6D28D9] text-white p-2 rounded-md"
                      onClick={() => handleShowDetails(mentor)}
                    >
                      Show Details
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded-md"
                      onClick={() => handleDeleteMentor(mentor.id, 'oldestMentors')}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Requests from Users Box */}
<motion.div
  className="bg-[#ffffff] p-6 rounded-lg shadow-xl"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.7 }}
>
  <h3 className="text-xl font-semibold text-[#4338CA]">Requests from Users</h3>

  {/* Mentors List */}
  <div className="mt-4 space-y-4">
    {requestsFromUsers.map((mentor) => (
      <div key={mentor.id} className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="font-bold">{mentor.name}</span>
          <span>{mentor.career}</span>
          <span className="text-sm text-gray-500">{mentor.achievements}</span>
        </div>
        <div className="flex space-x-2">
          {/* Approve Button */}
          <button
            className="bg-[#6D28D9] text-white p-2 rounded-md"
            onClick={() => handleApproveRequest(mentor.id)}
          >
            Approve
          </button>
          
          {/* Decline Button */}
          <button
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={() => handleDeclineRequest(mentor.id)}
          >
            Decline
          </button>
        </div>
      </div>
    ))}
  </div>
</motion.div>

        </div>

        {/* Search Bar above Other Mentors */}
        <motion.div
          className="bg-[#ffffff] p-6 rounded-lg shadow-xl mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-xl font-semibold text-[#4338CA]">Search Other Mentors</h3>
          <div className="mb-6 flex items-center space-x-4">
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-gray-300"
              placeholder="Search for a mentor..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <FaSearch className="text-xl text-[#4338CA]" />
          </div>
        </motion.div>

        {/* Other Mentors Box */}
        <motion.div
          className="mt-10 bg-[#ffffff] p-6 rounded-lg shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-xl font-semibold text-[#4338CA]">Other Mentors</h3>

          {/* Mentors List */}
          <div className="mt-4 space-y-4">
            {filterMentors(mentors).map((mentor) => (
              <div key={mentor.id} className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-bold">{mentor.name}</span>
                  <span>{mentor.career}</span>
                  <span className="text-sm text-gray-500">{mentor.achievements}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-[#6D28D9] text-white p-2 rounded-md"
                    onClick={() => handleShowDetails(mentor)}
                  >
                    Show Details
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-md"
                    onClick={() => handleDeleteMentor(mentor.id, 'other')}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mentor Details Modal */}
      {selectedMentor && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setSelectedMentor(null)}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-[#4338CA]">Mentor Details</h3>
            <p>Name: {selectedMentor.name}</p>
            <p>Career: {selectedMentor.career}</p>
            <p>Achievements: {selectedMentor.achievements}</p>
            <button
              className="bg-red-500 text-white p-2 rounded-md mt-4"
              onClick={() => setSelectedMentor(null)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
      
    </div>
  );
};

export default MentorManagement;
