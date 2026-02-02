import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogPostItem.module.css';

const HighlightText = ({ text, query }) => {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} style={{ backgroundColor: 'yellow', padding: '0 2px' }}>{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
};

const BlogPostItem = ({ id, title, summary, date, searchQuery }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.blogPostItem}>
      <Link to={`/Blog/${id}`} className={styles.title}>
        <h2><HighlightText text={title} query={searchQuery} /></h2>
      </Link>
      <p className={styles.summary}>
        <HighlightText text={summary} query={searchQuery} />
      </p>
      <p className={styles.date}>Published on {formattedDate}</p>
    </div>
  );
};

export default BlogPostItem;
