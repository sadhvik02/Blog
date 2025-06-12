import React, { useState } from 'react';
import { Routes, Route, useParams, Navigate, useNavigate } from 'react-router-dom';
import BlogPostList from './BlogPostList';
import BlogPostDetail from './BlogPostDetail';
import BlogPostForm from './BlogPostForm';

// Initial blog data
const initialPosts = [
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
];

const App = () => {
  const [posts, setPosts] = useState(initialPosts);

  // Create handler
  const handleCreatePost = (newPost) => {
    const newId = (posts.length + 1).toString();
    setPosts([...posts, { ...newPost, id: newId }]);
  };

  // Update handler
  const handleUpdatePost = (id, updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post))
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Blog" replace />} />

      {/* Blog List */}
      <Route
        path="/Blog"
        element={
          <BlogPostList
            posts={posts.map((post) => ({
              ...post,
              url: `/posts/${post.id}`,
            }))}
          />
        }
      />

      {/* View Post */}
      <Route path="/posts/:id" element={<PostDetailWrapper posts={posts} />} />

      {/* Create Post */}
      <Route path="/Blog/create" element={<CreatePostWrapper onCreate={handleCreatePost} />} />

      {/* Edit Post */}
      <Route
        path="/Blog/edit/:id"
        element={<EditPostWrapper posts={posts} onUpdate={handleUpdatePost} />}
      />

      {/* 404 Fallback */}
      <Route path="*" element={<p>404 – Page Not Found</p>} />
    </Routes>
  );
};

// View wrapper
const PostDetailWrapper = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);
  if (!post) return <p>Blog post not found.</p>;

  return (
    <BlogPostDetail
      id={post.id}
      title={post.title}
      content={post.content}
      author={post.author}
      date={post.date}
    />
  );
};

// Create wrapper
const CreatePostWrapper = ({ onCreate }) => {
  const navigate = useNavigate();

  const handleSubmit = (newPost) => {
    onCreate(newPost);
    navigate('/Blog');
  };

  return <BlogPostForm onSubmit={handleSubmit} />;
};

// Edit wrapper
const EditPostWrapper = ({ posts, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === id);

  if (!post) return <p>Blog post not found.</p>;

  const handleSubmit = (updatedPost) => {
    onUpdate(id, updatedPost);
    navigate(`/posts/${id}`);
  };

  return <BlogPostForm post={post} onSubmit={handleSubmit} />;
};

export default App;
