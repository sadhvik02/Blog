import React from 'react';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import styles from './BlogPostDetail.module.css';

const BlogPostDetail = ({ posts, comments, onAddComment }) => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) return <p>Post not found.</p>;

  // Ensure comments for this post exist
  const postComments = comments[id] || [];

  const handleCommentSubmit = (newComment) => {
    onAddComment(id, newComment);
  };

  return (
    <div className={styles.container}>
      <article className={styles.post}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.meta}>
          By <strong>{post.author}</strong> on {post.date}
        </p>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <hr className={styles.divider} />

      <section className={styles.commentsSection}>
        <h3>Comments</h3>
        <CommentList comments={postComments} />
        <CommentForm onSubmit={handleCommentSubmit} />
      </section>
    </div>
  );
};

export default BlogPostDetail;
