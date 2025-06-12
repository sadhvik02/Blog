import React, { useState } from 'react';
import { Routes, Route, useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import BlogPostList from './BlogPostList';
import BlogPostDetail from './BlogPostDetail';
import BlogPostForm from './BlogPostForm';

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

  const handleCreatePost = (newPost) => {
    const id = (blogPosts.length + 1).toString();
    const summary = newPost.content.slice(0, 50) + '...';
    const postWithId = { ...newPost, id, summary };
    setBlogPosts([...blogPosts, postWithId]);
  };

  const handleUpdatePost = (id, updatedPost) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post
      )
    );
  };

  const handleDeletePost = (id) => {
    setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Blog" replace />} />

      <Route
        path="/Blog"
        element={
          <div>
            <h1 style={{ paddingLeft: '1rem' }}>Blog Posts</h1>
            <Link to="/Blog/create" style={{ marginLeft: '1rem', color: 'blue' }}>
              + New Post
            </Link>
            <BlogPostList
              posts={blogPosts.map((post) => ({
                ...post,
                url: `/posts/${post.id}`,
              }))}
            />
          </div>
        }
      />

      <Route
        path="/Blog/create"
        element={
          <BlogPostForm
            onSubmit={(postData) => {
              handleCreatePost(postData);
              return Promise.resolve();
            }}
          />
        }
      />

      <Route
        path="/posts/:id"
        element={
          <PostDetailWrapper
            posts={blogPosts}
            onDelete={handleDeletePost}
          />
        }
      />

      <Route
        path="/posts/:id/edit"
        element={<EditPostWrapper posts={blogPosts} onUpdate={handleUpdatePost} />}
      />

      <Route path="*" element={<p>404 – Page Not Found</p>} />
    </Routes>
  );
};

// Detail page wrapper with delete button
const PostDetailWrapper = ({ posts, onDelete }) => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);
  const navigate = useNavigate();

  if (!post) return <p>Blog post not found.</p>;

  const handleDelete = () => {
    onDelete(id);
    navigate('/Blog');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <BlogPostDetail {...post} />
      <Link to={`/posts/${id}/edit`} style={{ marginRight: '1rem' }}>
        ✏️ Edit
      </Link>
      <button onClick={handleDelete} style={{ color: 'red' }}>
        🗑️ Delete
      </button>
    </div>
  );
};

// Edit form wrapper
const EditPostWrapper = ({ posts, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === id);

  if (!post) return <p>Post not found.</p>;

  return (
    <BlogPostForm
      post={post}
      onSubmit={(updatedData) => {
        onUpdate(id, updatedData);
        navigate(`/posts/${id}`);
        return Promise.resolve();
      }}
    />
  );
};

export default App;
