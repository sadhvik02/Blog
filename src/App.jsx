import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BlogPostList from './BlogPostList';
import BlogPostDetail from './BlogPostDetail';
import BlogPostForm from './BlogPostForm';
import Layout from './Components/Layout';

const App = () => {
  const [blogPosts, setBlogPosts] = useState([
    {
      id: '1',
      title: 'First Blog Post',
      summary: 'Summary of the first post.',
      content: '<p>This is <strong>full content</strong> of the first post.</p>',
      author: 'Alice',
      date: '2023-01-01',
    },
    {
      id: '2',
      title: 'Second Blog Post',
      summary: 'Summary of the second post.',
      content: '<p>This is <em>full content</em> of the second post.</p>',
      author: 'Bob',
      date: '2023-02-01',
    },
  ]);

  const [comments, setComments] = useState({
    '1': [],
    '2': [],
  });

  const handleCreatePost = (newPost) => {
    const id = (blogPosts.length + 1).toString();
    const summary = newPost.content.slice(0, 50) + '...';
    const postWithId = { ...newPost, id, summary };
    setBlogPosts([...blogPosts, postWithId]);
    setComments({ ...comments, [id]: [] });
    // Navigate will be handled by the form component or we can redirect here if we had `useNavigate`, 
    // but usually in this structure the Form might redirect. 
    // However, looking at imports, `Navigate` is imported but not `useNavigate`.
    // Let's assume the component handles it or we re-render.
  };

  const handleAddComment = (postId, comment) => {
    setComments(prevComments => ({
      ...prevComments,
      [postId]: [...(prevComments[postId] || []), comment]
    }));
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BlogPostList posts={blogPosts} />} />
        <Route path="Blog" element={<BlogPostList posts={blogPosts} />} />
        <Route path="Blog/create" element={<BlogPostForm onAddPost={handleCreatePost} />} />
        <Route 
          path="Blog/:id" 
          element={
            <BlogPostDetail 
              posts={blogPosts} 
              comments={comments} 
              onAddComment={handleAddComment} 
            />
          } 
        />
      </Route>
    </Routes>
  );
};

export default App;
