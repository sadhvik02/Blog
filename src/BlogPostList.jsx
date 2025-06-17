import React from 'react';
import { Link } from 'react-router-dom';
import BlogPostItem from './BlogPostItem';
import styles from './BlogPostList.module.css';

const BlogPostList = ({ posts }) => {
  return (
    <div className={styles.blogPostListWrapper}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Blog Posts</h1>
        <Link to="/Blog/create" className={styles.createButton}>
          + New Post
        </Link>
      </div>

      <div className={styles.blogPostList}>
        {posts.map((post) => (
          <BlogPostItem
            key={post.id}
            title={post.title}
            summary={post.summary}
            date={post.date}
            url={post.url}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPostList;
