import React, { useEffect, useState } from "react";
import { API_URL } from "../../constant.js";
import {Link} from "react-router-dom";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  // Fetch posts from the API
  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(API_URL);
        if (response.status === 200) {
          const json = await response.json();
          setPosts(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError("An error occurred while fetching posts.");
        console.log("An error occurred: ", e);
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
  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post.id} className="post-container">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={`/posts/${post.id}`}>Read in detail ({post.id})</Link>
            <p>Published at: {formatDate(post.created_at)}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PostsList;