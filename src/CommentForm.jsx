import React, { useState } from "react";
import styles from "./CommentForm.module.css";

const CommentForm = ({ onSubmit, isLoggedIn, userName }) => {
  const [name, setName] = useState(userName || "");
  const [text, setText] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || (!isLoggedIn && !name)) return;
    onSubmit({ name, text, avatar, date: new Date().toISOString() });
    setText("");
    setAvatar("");
    if (!isLoggedIn) setName("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {!isLoggedIn && (
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
          />
        </div>
      )}
      <div className={styles.field}>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          placeholder="Write your comment here..."
        ></textarea>
      </div>
      <div className={styles.field}>
        <label htmlFor="avatar">Avatar URL (optional)</label>
        <input
          id="avatar"
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://example.com/avatar.jpg"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
