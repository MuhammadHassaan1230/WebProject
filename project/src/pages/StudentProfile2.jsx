import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileHeader from '../components/profile/ProfileHeader';
import CareerProgress from '../components/profile/CareerProgress';
import GoalsSection from '../components/profile/GoalsSection';
import ActivityFeed from '../components/profile/ActivityFeed';
import QuizResults from './QuizResults';
import Chatbot from '../components/chatbot/Chatbot';
import StudentHeader from '../components/profileheaders/StudentHeader';

const sectionsStudent = [
  { name: 'Career Progress', key: 'career' },
  { name: 'Goals', key: 'goals' },
  { name: 'Activity Feed', key: 'activity' },
  { name: 'Quiz Results', key: 'quiz' },
  { name: 'Chatbot', key: 'chatbot' }
];

const sectionsMentor = [
  { name: 'Career Progress', key: 'career' },
  { name: 'Goals', key: 'goals' }
];

export default function StudentProfile2() {
  const user = useSelector((state) => state.auth.user);
  const [activeSection, setActiveSection] = useState('career');
  const navigate = useNavigate();

  const renderSection = () => {
    const role = user?.role;

    if (role === 'mentor') {
      switch (activeSection) {
        case 'career':
          return <CareerProgress />;
        case 'goals':
          return <GoalsSection />;
        default:
          return <CareerProgress />;
      }
    }

    // For students
    switch (activeSection) {
      case 'career':
        return <CareerProgress />;
      case 'goals':
        return <GoalsSection />;
      case 'activity':
        return <ActivityFeed />;
      case 'quiz':
        return <QuizResults />;
      case 'chatbot':
        return <Chatbot />;
      default:
        return <CareerProgress />;
    }
  };

  const renderButtons = () => {
    const role = user?.role;
    const sections = role === 'mentor' ? sectionsMentor : sectionsStudent;

    return sections.map((section) => (
      <motion.button
        key={section.key}
        onClick={() => setActiveSection(section.key)}
        className={`px-4 py-2 rounded-lg transition ${
          activeSection === section.key ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {section.name}
      </motion.button>
    ));
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StudentHeader />
        
        {/* Render buttons for navigation */}
        <div className="mb-4 flex space-x-4 mt-4">
          {renderButtons()}
        </div>

        {/* Animate section rendering */}
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
