import React, { useState } from 'react';
import Post from './Post';

function Feed() {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: 'Jane Smith',
        headline: 'Senior Frontend Developer at Tech Co',
        avatar: 'https://via.placeholder.com/40',
      },
      content: "Just launched our new React application! Exciting times ahead! #webdev #react",
      timestamp: new Date('2024-02-20T10:00:00'),
      likes: 42,
      comments: [
        {
          id: '1',
          author: {
            name: 'Bob Wilson',
            avatar: 'https://via.placeholder.com/32',
          },
          content: 'Congratulations! Looking forward to seeing it in action.',
          timestamp: new Date('2024-02-20T10:30:00'),
        }
      ],
    },
  ]);

  // Function to handle input changes
  const handleInputChange = (e) => {
    setNewPost(e.target.value);
  };

  // Function to create a new post
  const handleCreatePost = () => {
    if (newPost.trim()) {
      const newPostData = {
        id: Date.now(),
        author: {
          name: 'Current User',
          headline: 'Frontend Developer',
          avatar: 'https://via.placeholder.com/40',
        },
        content: newPost,
        timestamp: new Date(),
        likes: 0,
        comments: [],
      };

      setPosts([newPostData, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex gap-4 items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="Start a post"
            value={newPost}
            onChange={handleInputChange}
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleCreatePost}
            className="bg-blue-500 text-white rounded-full px-4 py-2"
          >
            Post
          </button>
        </div>
      </div>

      {/* Render posts */}
      {posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

export default Feed;
