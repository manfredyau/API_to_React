import React from "react";
import { Route, Routes } from "react-router-dom";
import PostsList from "../features/posts/PostsList";
import PostDetails from "../features/posts/PostDetails.jsx";
import NewPostForm from "../features/posts/NewPostForm.jsx";
import EditPostForm from "../features/posts/EditPostForm.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PostsList />} />
      <Route path="posts/:id" element={<PostDetails />} />
      <Route path="posts/:id/edit" element={<EditPostForm />} />
      <Route path="/new" element={<NewPostForm />} />
    </Routes>
  );
}
