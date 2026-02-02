import React from "react";
import styles from "./Comment.module.css";

const Comment = ({ name, date, text, avatar }) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Default placeholder if no avatar is provided
  const userAvatar = avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=random";

  return (
    <div className={styles.comment} role="article">
      <img src={userAvatar} alt={`${name}'s avatar`} className={styles.avatar} />
      <div className={styles.content}>
        <div className={styles.header}>
          <strong>{name}</strong>
          <span className={styles.date}>{formattedDate}</span>
        </div>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Comment;
