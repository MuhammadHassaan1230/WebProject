import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaUser, FaCalendarAlt, FaChalkboardTeacher, FaClipboardList, FaCogs } from 'react-icons/fa';

// Dummy data for bar graph (posts per week)
const dummyGraphData = [
  { week: 'Week 1', posts: 10 },
  { week: 'Week 2', posts: 20 },
  { week: 'Week 3', posts: 15 },
  { week: 'Week 4', posts: 25 },
];

// Dummy data for users, events, and mentors
const dummyData = {
  users: [{ name: 'Arsal Ali' }, { name: 'Ahmar' }, { name: 'Sameer Khalid' }],
  events: [{ title: 'Knowledge About Enviornmental Engineering' }, { title: 'AI Bootcamp' }],
  mentors: [{ name: 'Muhammad Ahmad' }, { name: 'Haassan Khan' }],
  growthStats: {
    totalUsers: 1200,
    totalEvents: 75,
    totalMentors: 50,
  },
};

// Growth Logo component
const GrowthLogo = () => (
  <motion.div
    className="text-4xl font-bold text-white absolute top-4 right-4"
    style={{ color: '#6D28D9' }}
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    Growth
  </motion.div>
);

const Dashboard = () => {
  const [graphData, setGraphData] = useState(dummyGraphData); // Set dummy data initially
  const [users, setUsers] = useState(dummyData.users);
  const [events, setEvents] = useState(dummyData.events);
  const [mentors, setMentors] = useState(dummyData.mentors);
  const [loading, setLoading] = useState(true); // Track loading state

  // // useEffect(() => {
  // //   const fetchData = async () => {
  // //     try {
  // //       const graphResponse = await axios.get('/api/admin/posts-per-week');
  // //       setGraphData(graphResponse.data);
  // //     } catch (error) {
  // //       console.error('Error fetching graph data', error);
  // //       setGraphData(dummyGraphData); // Fallback to dummy data
  // //     } finally {
  // //       setLoading(false);
  // //     }
  // //   };

  // //   fetchData();
  // }, []);

  return (
    <div className="flex bg-gradient-to-b from-[#e1e7ff] to-[#ffffff] min-h-screen relative">
      {/* Growth Logo */}
      <GrowthLogo />

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
        {/* Stats Section */}
        <motion.div
          className="my-8 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {[{ title: 'Total Users', value: 1200, icon: <FaUser /> }, { title: 'Total Events', value: 75, icon: <FaCalendarAlt /> }, { title: 'Total Mentors', value: 50, icon: <FaChalkboardTeacher /> }]
            .map((stat, index) => (
              <motion.div
                key={index}
                className="bg-[#ffffff] p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all ease-in-out transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center space-x-4">
                  {stat.icon}
                  <h2 className="text-xl font-bold text-[#4338CA] mb-2">{stat.title}</h2>
                </div>
                <p className="text-3xl font-bold text-black">{stat.value}</p>
              </motion.div>
            ))}
        </motion.div>

        {/* Growth Statistics - Posts Per Week */}
        <motion.div
          className="my-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-semibold text-[#4338CA]">Growth Statistics: Posts Per Week</h2>
          <div className="mt-6 w-full h-80 bg-[#ffffff] rounded-lg shadow-xl p-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="week" tick={{ fill: '#4338CA' }} />
                <YAxis tick={{ fill: '#4338CA' }} />
                <Tooltip cursor={{ fill: '#f5f5f5' }} />
                <Bar
                  dataKey="posts"
                  fill="#6D28D9"
                  radius={[10, 10, 10, 10]}
                  animationBegin={100}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Latest Message */}
        <motion.div
          className="mt-10 p-8 bg-[#ffffff] rounded-lg shadow-xl hover:shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-semibold text-[#4338CA]">Latest Message</h3>
          <p className="mt-4 text-lg text-black">Keep pushing forward! You're doing great. Stay focused on your growth!</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;



