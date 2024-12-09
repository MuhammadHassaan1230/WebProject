import React from 'react';
import { formatTimestamp } from '../../utils/dateUtils';
import { PLACEHOLDER_IMAGES } from '../../utils/constants';


function Comment({ author, content, timestamp }) {
  return (
    <div className="flex gap-3 py-3">
      <img
        src={author.avatar || PLACEHOLDER_IMAGES.COMMENT_AVATAR}
        alt={author.name}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex-1">
        <div className="bg-gray-100 rounded-lg p-3">
          <h4 className="font-semibold text-sm">{author.name}</h4>
          <p className="text-sm">{content}</p>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {formatTimestamp(timestamp)}
        </div>
      </div>
    </div>
  );
}

export default Comment;