import React, { useState } from 'react';
import { PLACEHOLDER_IMAGES } from '../../utils/constants';

function CommentForm({ onSubmit }) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mt-2">
      <img
        src={PLACEHOLDER_IMAGES.COMMENT_AVATAR}
        alt="Current user"
        className="w-8 h-8 rounded-full"
      />
      <div className="flex-1 flex">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-gray-100 rounded-full px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!comment.trim()}
          className="ml-2 px-4 py-1 text-sm text-blue-600 font-semibold disabled:text-gray-400"
        >
          Post
        </button>
      </div>
    </form>
  );
}

export default CommentForm;