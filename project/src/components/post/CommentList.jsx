import React from 'react';
import Comment from './Comment';

function CommentList({ comments }) {
  return (
    <div className="mt-2 border-t">
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}

export default CommentList;