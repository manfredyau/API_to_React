import React, { useEffect, useState } from "react";
import { API_URL } from "../../constant.js";
import { Link } from "react-router-dom";

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

  const deletePost = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        throw response;
      }
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
