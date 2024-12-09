import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileHeader from '../components/profile/ProfileHeader';
import Achievements from '../components/mentor/Achievements';
import FeedbackSection from '../components/mentor/FeedbackSection';
import Schedule from '../components/mentor/Schedule';
import Resources from '../components/mentor/Resources';
import MentorProfileHeader from '../components/profileheaders/MentorHeader';
import GiveFeedback from '../components/mentor/GiveFeedback';
const sectionsMentor = [
  { name: 'Upload Resource', key: 'upload' },
  { name: 'Achievements', key: 'achievements' },
  { name: 'Feedback Section', key: 'feedback' },
  { name: 'Schedule', key: 'schedule' },
  {name:"Feedback",key:"givefeedback"},
];

export default function MentorProfile() {
  const user = useSelector((state) => state.auth.user);
  const [activeSection, setActiveSection] = useState('upload');
  const navigate = useNavigate();

  const renderSection = () => {
    if (activeSection === 'upload') return <Resources />;
    if (activeSection === 'achievements') return <Achievements />;
    if (activeSection === 'feedback') return <FeedbackSection />;
    if (activeSection === 'schedule') return <Schedule />;
    if (activeSection === 'givefeedback') return <GiveFeedback />;
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 indigo-600">
        <motion.button
          onClick={() => navigate('/feed')}
          className="flex items-center text-indigo-600 hover:text-indigo-700 transition mb-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            whileHover={{ rotate: -15 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </motion.svg>
          Back
        </motion.button>

        <MentorProfileHeader />

       

        <div className="mb-4 flex space-x-4 mt-4">
          {sectionsMentor.map((section) => (
            <motion.button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`px-4 py-2 rounded-lg transition ${
                activeSection === section.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {section.name}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            className="mt-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
