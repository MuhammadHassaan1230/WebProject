import React from 'react';
import { AiOutlineLike, AiOutlineComment, AiOutlineShareAlt } from 'react-icons/ai';

function PostActions({ likes, comments, onCommentClick }) {
  return (
    <div className="border-t pt-3">
      <div className="flex justify-between text-gray-500">
        <button className="flex items-center hover:bg-gray-100 px-3 py-1 rounded-md">
          <AiOutlineLike className="mr-1" />
          <span className="text-sm">Like ({likes})</span>
        </button>
        <button 
          className="flex items-center hover:bg-gray-100 px-3 py-1 rounded-md"
          onClick={onCommentClick}
        >
          <AiOutlineComment className="mr-1" />
          <span className="text-sm">Comment ({comments.length})</span>
        </button>
        <button className="flex items-center hover:bg-gray-100 px-3 py-1 rounded-md">
          <AiOutlineShareAlt className="mr-1" />
          <span className="text-sm">Share</span>
        </button>
      </div>
    </div>
  );
}

export default PostActions;