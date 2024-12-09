import React, { useState } from 'react';
import PostActions from '../post/PostActions';
import CommentList from '../post/CommentList';
import CommentForm from '../post/CommentForm';
import { formatTimestamp } from '../../utils/dateUtils';
import { PLACEHOLDER_IMAGES, CURRENT_USER } from '../../utils/constants';
import { generateId } from '../../utils/idGenerator';



function Post({ author, content, timestamp, likes, comments: initialComments }) {
  const [comments, setComments] = useState(initialComments || []);
  const [showComments, setShowComments] = useState(false);

  const handleAddComment = (content) => {
    const newComment = {
      id: generateId(),
      author: CURRENT_USER,
      content,
      timestamp: new Date(),
    };
    setComments([...comments, newComment]);
    setShowComments(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img
            src={author.avatar || PLACEHOLDER_IMAGES.USER_AVATAR}
            alt={author.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-semibold">{author.name}</h3>
            <p className="text-sm text-gray-500">{author.headline}</p>
            <p className="text-xs text-gray-400">
              {formatTimestamp(timestamp)}
            </p>
          </div>
        </div>
        
        <p className="text-gray-800 mb-4">{content}</p>
        
        <PostActions 
          likes={likes} 
          comments={comments}
          onCommentClick={() => setShowComments(!showComments)} 
        />

        {showComments && (
          <div className="mt-4">
            <CommentList comments={comments} />
            <CommentForm onSubmit={handleAddComment} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;