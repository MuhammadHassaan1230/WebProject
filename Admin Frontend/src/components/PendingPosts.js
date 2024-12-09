import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCalendarAlt, FaSearch, FaChalkboardTeacher, FaClipboardList, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Dummy data for posts (initially)
const dummyPosts = [
  { id: '1', title: 'Post on Software Engineering These Days...', author: 'John Doe', content: 'This is the full content of the post about software engineering...', timestamp: new Date(), likes: 0, comments: [], authorModel: 'Student' },
  { id: '2', title: 'Exploring Data Science and Machine Learning', author: 'Jane Smith', content: 'A deep dive into the world of data science and machine learning...', timestamp: new Date(), likes: 0, comments: [], authorModel: 'Mentor' },
  { id: '3', title: 'The Future of Web Development', author: 'Alice Johnson', content: 'An article about the future of web technologies and their impact...', timestamp: new Date(), likes: 0, comments: [], authorModel: 'Student' },
];

const PendingPosts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from API on component mount
//     const fetchPosts = async () => {
//   try {
//     const response = await fetch('/api/posts/');
//     console.log('Response:', response);
//     if (response.ok) {
//       // Use text() to inspect the response body first
//       const responseBody = await response.text();
//       console.log('Response Body:', responseBody); // Log the raw response body

//       // Try parsing the response body as JSON
//       try {
//         const data = JSON.parse(responseBody);
//         console.log("Data here", data);
//         setPosts(data); // Use API data if successful
//       } catch (jsonError) {
//         console.error('Error parsing JSON:', jsonError);
//       }
//     } else {
//       console.error('Failed to fetch posts, loading dummy data');
//       setPosts(dummyPosts); // Load dummy data if API fails
//     }
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     setPosts(dummyPosts); // Load dummy data if API fails
//   } finally {
//     setLoading(false); // Set loading to false once data is loaded
//   }
// };

const fetchPosts = async () => {
  try {
    const response = await fetch('/api/posts/');
    console.log('Response:', response);

    // Check if the response is JSON
    const contentType = response.headers.get('Content-Type');
    if (response.ok && contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log("Data here", data);
      setPosts(data); // Use API data if successful
    } else {
      // If the response is not JSON, log an error and handle accordingly
      const body = await response.text(); // Read response body as text
      console.error('Expected JSON, but got HTML or another response type:', body);
      setPosts([]); // Handle error case by showing no posts or fallback data
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    setPosts([]); // Load dummy data or empty posts if fetch fails
  } finally {
    setLoading(false); // Stop loading once data is fetched (or error occurs)
  }
};



    fetchPosts();
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Fetch more posts (simulated function)
  const fetchMorePosts = async () => {
    setLoading(true);
    // Simulate fetching data (replace with real API request)
    const newPosts = [
      { id: '4', title: 'Advanced Topics in AI', author: 'John Doe', content: 'Exploring cutting-edge research in AI...', timestamp: new Date(), likes: 0, comments: [], authorModel: 'Student' },
      { id: '5', title: 'Blockchain in 2024', author: 'Alice Johnson', content: 'A look at the impact of blockchain technology in 2024...', timestamp: new Date(), likes: 0, comments: [], authorModel: 'Mentor' },
    ];

    setTimeout(() => {
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setLoading(false);
    }, 1000); // Simulate network delay
  };

  // Delete post (send request to backend)
  const handleDeletePost = async (postId) => {
    console.log(`Attempting to delete post with ID: ${postId}`);
    
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the deleted post from the state (frontend)
        setPosts(posts.filter(post => post.id !== postId));
        console.log(`Post with ID: ${postId} successfully deleted`);
      } else {
        console.error(`Failed to delete post with ID: ${postId}`);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle post selection (open post detail pane on double-click)
  const handlePostDoubleClick = (post) => {
    setSelectedPost(post);
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
          <motion.div
            key={index}
            className="w-full"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 250 }}
          >
            <Link
              to={item.path}
              className="block bg-[#ffffff] text-black px-4 py-3 rounded-lg mb-6 w-full font-semibold shadow-md flex items-center space-x-4 hover:bg-[#4338CA] transition-all"
            >
              <span className=" text-black">{item.icon}</span>
              <span className=" text-black">{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Search Bar */}
        <motion.div
          className="bg-[#ffffff] p-6 mt-6 rounded-lg shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-3 rounded-lg border-2 border-gray-300"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </motion.div>

        {/* Pending Posts List */}
        <motion.div
          className="my-8 bg-[#ffffff] p-6 rounded-lg shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-semibold text-[#4338CA]">Pending Posts</h2>

          <div className="mt-6 space-y-4">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onDoubleClick={() => handlePostDoubleClick(post)} // Double-click to open post details
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{post.title}</span>
                  <span className="text-sm text-gray-500">{`By: ${post.author}`}</span>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeletePost(post.id)} // Trigger the delete function directly
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  <FaTrashAlt />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Show More Button */}
        <motion.div
          className="my-6 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <button
            onClick={fetchMorePosts}
            className="bg-blue-500 text-white p-3 rounded-md"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Show More'}
          </button>
        </motion.div>
      </div>

      {/* Post Detail Pane */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            className="bg-white p-6 rounded-lg w-1/3 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold text-[#4338CA]">{selectedPost.title}</h3>
            <p className="mt-2 text-sm text-gray-500">By: {selectedPost.author}</p>
            <p className="mt-4 text-gray-700">{selectedPost.content}</p>
            {selectedPost.image && (
              <img src={selectedPost.image} alt={selectedPost.title} className="mt-4 w-full h-auto rounded-md" />
            )}
            <div className="mt-6 flex justify-end space-x-4">
              <button onClick={() => setSelectedPost(null)} className="bg-gray-500 text-white p-3 rounded-md">Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PendingPosts;


// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaUser, FaCalendarAlt, FaSearch, FaCheck, FaTimes, FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// // Dummy data for posts
// const dummyPosts = [
//   { id: 1, title: 'Post on Software Engineering These Days...', author: 'John Doe', content: 'This is the full content of the post about software engineering...', image: 'https://via.placeholder.com/150' },
//   { id: 2, title: 'Exploring Data Science and Machine Learning', author: 'Jane Smith', content: 'A deep dive into the world of data science and machine learning...', image: 'https://via.placeholder.com/150' },
//   { id: 3, title: 'The Future of Web Development', author: 'Alice Johnson', content: 'An article about the future of web technologies and their impact...', image: 'https://via.placeholder.com/150' },
// ];

// const PendingPosts = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [approveActive, setApproveActive] = useState(false);
//   const [rejectActive, setRejectActive] = useState(false);
//   const [posts, setPosts] = useState(dummyPosts);

//   // Handle search query change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Filter posts based on search query
//   const filteredPosts = posts.filter((post) => 
//     post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.author.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Handle post selection (single click)
//   const handlePostClick = (post) => {
//     setSelectedPost(post);
//     setApproveActive(true);
//     setRejectActive(true);
//   };

//   // Handle post double click (open detailed view in a pane)
//   const handlePostDoubleClick = (post) => {
//     setSelectedPost(post);
//   };

//   // Approve post
//   const handleApprove = () => {
//     setPosts(posts.filter(post => post.id !== selectedPost.id)); // Remove post after approval
//     setSelectedPost(null); // Close the post detail pane
//   };

//   // Reject post
//   const handleReject = () => {
//     setPosts(posts.filter(post => post.id !== selectedPost.id)); // Remove post after rejection
//     setSelectedPost(null); // Close the post detail pane
//   };

//   return (
//     <div className="flex bg-gradient-to-b from-[#e1e7ff] to-[#ffffff] min-h-screen relative">
//       {/* Sidebar Component */}
//       <div className="w-64 bg-gradient-to-b from-[#4338CA] to-[#6D28D9] min-h-screen p-4 flex flex-col items-center shadow-lg transition-transform duration-300 ease-in-out">
//         {[ 
//           { label: 'Dashboard', icon: <FaUser />, path: '/' },
//           { label: 'Mentor Management', icon: <FaChalkboardTeacher />, path: '/mentor-management' },
//           { label: 'Pending Posts', icon: <FaCalendarAlt />, path: '/pending-posts' },
//           { label: 'Feedback', icon: <FaClipboardList />, path: '/Feedbacks' },
//         ].map((item, index) => (
//           <motion.div
//             key={index}
//             className="w-full"
//             whileHover={{ scale: 1.08 }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ type: 'spring', stiffness: 250 }}
//           >
//             <Link
//               to={item.path}
//               className="block bg-[#ffffff] text-black px-4 py-3 rounded-lg mb-6 w-full font-semibold shadow-md flex items-center space-x-4 hover:bg-[#4338CA] transition-all"
//             >
//               <span className=" text-black">{item.icon}</span>
//               <span className=" text-black">{item.label}</span>
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         {/* Search Bar */}
//         <motion.div
//           className="bg-[#ffffff] p-6 mt-6 rounded-lg shadow-xl"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.7 }}
//         >
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Search posts..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="w-full p-3 rounded-lg border-2 border-gray-300"
//             />
//             <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           </div>
//         </motion.div>

//         {/* Pending Posts List */}
//         <motion.div
//           className="my-8 bg-[#ffffff] p-6 rounded-lg shadow-xl"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.7 }}
//         >
//           <h2 className="text-3xl font-semibold text-[#4338CA]">Pending Posts</h2>

//           <div className="mt-6 space-y-4">
//             {filteredPosts.map((post) => (
//               <motion.div
//                 key={post.id}
//                 className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
//                 onClick={() => handlePostClick(post)}
//                 onDoubleClick={() => handlePostDoubleClick(post)}
//               >
//                 <div className="flex flex-col">
//                   <span className="font-semibold">{post.title}</span>
//                   <span className="text-sm text-gray-500">{`By: ${post.author}`}</span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Action Buttons (Approve / Reject) */}
//         <motion.div
//           className="my-6 flex justify-start space-x-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.7 }}
//         >
//           <button
//             className={`bg-green-500 text-white p-3 rounded-md ${!approveActive && 'opacity-50 cursor-not-allowed'}`}
//             disabled={!approveActive}
//             onClick={handleApprove}
//           >
//             <FaCheck className="inline mr-2" />
//             Approve
//           </button>
//           <button
//             className={`bg-red-500 text-white p-3 rounded-md ${!rejectActive && 'opacity-50 cursor-not-allowed'}`}
//             disabled={!rejectActive}
//             onClick={handleReject}
//           >
//             <FaTimes className="inline mr-2" />
//             Reject
//           </button>
//         </motion.div>
//       </div>

//       {/* Post Detail Pane */}
//       {selectedPost && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <motion.div
//             className="bg-white p-6 rounded-lg w-1/3 shadow-lg"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.7 }}
//           >
//             <h3 className="text-2xl font-semibold text-[#4338CA]">{selectedPost.title}</h3>
//             <p className="mt-2 text-sm text-gray-500">By: {selectedPost.author}</p>
//             <p className="mt-4 text-gray-700">{selectedPost.content}</p>
//             {selectedPost.image && (
//               <img src={selectedPost.image} alt={selectedPost.title} className="mt-4 w-full h-auto rounded-md" />
//             )}
//             <div className="mt-6 flex justify-end space-x-4">
//               <button onClick={() => setSelectedPost(null)} className="bg-gray-500 text-white p-3 rounded-md">Close</button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PendingPosts;


// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaUser,FaCalendarAlt,FaSearch, FaCheck, FaTimes,FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// // Dummy data for posts
// const dummyPosts = [
//   { id: 1, title: 'Post on Software Engineering These Days...', author: 'John Doe', content: 'This is the full content of the post about software engineering...', image: 'https://via.placeholder.com/150' },
//   { id: 2, title: 'Exploring Data Science and Machine Learning', author: 'Jane Smith', content: 'A deep dive into the world of data science and machine learning...', image: 'https://via.placeholder.com/150' },
//   { id: 3, title: 'The Future of Web Development', author: 'Alice Johnson', content: 'An article about the future of web technologies and their impact...', image: 'https://via.placeholder.com/150' },
// ];

// const PendingPosts = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [approveActive, setApproveActive] = useState(false);
//   const [rejectActive, setRejectActive] = useState(false);
//   const [posts, setPosts] = useState(dummyPosts);

//   // Handle search query change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Filter posts based on search query
//   const filteredPosts = posts.filter((post) => 
//     post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.author.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Handle post selection (single click)
//   const handlePostClick = (post) => {
//     setSelectedPost(post);
//     setApproveActive(true);
//     setRejectActive(true);
//   };

//   // Handle post double click (open detailed view in a pane)
//   const handlePostDoubleClick = (post) => {
//     setSelectedPost(post);
//   };

//   // Approve post
//   const handleApprove = () => {
//     setPosts(posts.filter(post => post.id !== selectedPost.id)); // Remove post after approval
//     setSelectedPost(null); // Close the post detail pane
//   };

//   // Reject post
//   const handleReject = () => {
//     setPosts(posts.filter(post => post.id !== selectedPost.id)); // Remove post after rejection
//     setSelectedPost(null); // Close the post detail pane
//   };

//   return (
//     <div className="flex bg-gradient-to-b from-[#e1e7ff] to-[#ffffff] min-h-screen relative">
//       {/* Sidebar Component */}
//       <div className="w-64 bg-gradient-to-b from-[#4338CA] to-[#6D28D9] min-h-screen p-4 flex flex-col items-center shadow-lg transition-transform duration-300 ease-in-out">
//         {[
//          { label: 'Dashboard', icon: <FaUser />, path: '/' },
//          { label: 'Mentor Management', icon: <FaChalkboardTeacher />, path: '/mentor-management' }, // Updated with routing path
//          { label: 'Pending Posts', icon: <FaCalendarAlt />, path: '/pending-posts' }, 
//          { label: 'Feedback', icon: <FaClipboardList />, path: '/Feedbacks' },
//         ].map((item, index) => (
//           <motion.div
//             key={index}
//             className="w-full"
//             whileHover={{ scale: 1.08 }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ type: 'spring', stiffness: 250 }}
//           >
//             <Link
//               to={item.path}
//               className="block bg-[#ffffff] text-black px-4 py-3 rounded-lg mb-6 w-full font-semibold shadow-md flex items-center space-x-4 hover:bg-[#4338CA] transition-all"
//             >
//               <span>{item.label}</span>
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         {/* Search Bar */}
//         <motion.div
//           className="bg-[#ffffff] p-6 mt-6 rounded-lg shadow-xl"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.7 }}
//         >
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Search posts..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="w-full p-3 rounded-lg border-2 border-gray-300"
//             />
//             <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           </div>
//         </motion.div>

//         {/* Pending Posts List */}
//         <motion.div
//           className="my-8 bg-[#ffffff] p-6 rounded-lg shadow-xl"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.7 }}
//         >
//           <h2 className="text-3xl font-semibold text-[#4338CA]">Pending Posts</h2>

//           <div className="mt-6 space-y-4">
//             {filteredPosts.map((post) => (
//               <motion.div
//                 key={post.id}
//                 className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
//                 onClick={() => handlePostClick(post)}
//                 onDoubleClick={() => handlePostDoubleClick(post)}
//               >
//                 <div className="flex flex-col">
//                   <span className="font-semibold">{post.title}</span>
//                   <span className="text-sm text-gray-500">{`By: ${post.author}`}</span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Action Buttons (Approve / Reject) */}
//         <motion.div
//           className="my-6 flex justify-start space-x-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.7 }}
//         >
//           <button
//             className={`bg-green-500 text-white p-3 rounded-md ${!approveActive && 'opacity-50 cursor-not-allowed'}`}
//             disabled={!approveActive}
//             onClick={handleApprove}
//           >
//             <FaCheck className="inline mr-2" />
//             Approve
//           </button>
//           <button
//             className={`bg-red-500 text-white p-3 rounded-md ${!rejectActive && 'opacity-50 cursor-not-allowed'}`}
//             disabled={!rejectActive}
//             onClick={handleReject}
//           >
//             <FaTimes className="inline mr-2" />
//             Reject
//           </button>
//         </motion.div>
//       </div>

//       {/* Post Detail Pane */}
//       {selectedPost && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <motion.div
//             className="bg-white p-6 rounded-lg w-1/3 shadow-lg"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.7 }}
//           >
//             <h3 className="text-2xl font-semibold text-[#4338CA]">{selectedPost.title}</h3>
//             <p className="mt-2 text-sm text-gray-500">By: {selectedPost.author}</p>
//             <p className="mt-4 text-gray-700">{selectedPost.content}</p>
//             {selectedPost.image && (
//               <img src={selectedPost.image} alt={selectedPost.title} className="mt-4 w-full h-auto rounded-md" />
//             )}
//             <div className="mt-6 flex justify-end space-x-4">
//               <button onClick={() => setSelectedPost(null)} className="bg-gray-500 text-white p-3 rounded-md">Close</button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PendingPosts;
