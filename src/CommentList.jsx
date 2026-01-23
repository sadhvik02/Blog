import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments }) => {
  return (
    <div aria-live="polite">
      {comments.map((comment, index) => (
        <Comment
          key={index}
          name={comment.name}
          date={comment.date}
          text={comment.text}
          avatar={comment.avatar}
        />
      ))}
    </div>
  );
};

export default CommentList;
