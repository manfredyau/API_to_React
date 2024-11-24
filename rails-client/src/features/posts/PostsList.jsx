import React, { useEffect, useState } from "react";
import {
  fetchAllPosts,
  deletePost as deletePostService,
} from "../../services/postService.js";
import { Link } from "react-router-dom";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  // Fetch posts from the API
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchAllPosts();
        setPosts(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  function formatDate(date) {
    date = new Date(date);
    return date.toLocaleString();
  }

  const deletePost = async (id) => {
    try {
      await deletePostService(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (e) {
      console.log("An error occurred while deleting post: ", e);
    }
  };

  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post.id} className="post-container">
            <h2>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <p>Published at: {formatDate(post.created_at)}</p>
            <div>
              <button onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PostsList;
