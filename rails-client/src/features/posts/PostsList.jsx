import { useEffect, useState } from "react";
import { fetchAllPosts, deletePost } from "../../services/postService.js";
import { Link } from "react-router-dom";
import "./PostImage.css"

function PostsList() {
  // posts: {
  //   id: number,
  //   title: string,
  //   body: string,
  //   created_at: string,
  //   updated_at: string,
  //   image_url?: string
  // }[]
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
        console.error("Failed to fetch posts", e);
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

  const deletePostHandler = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (e) {
      console.error("An error occurred while deleting post: ", e);
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
            {/*Check if the post has an image and display it if it does*/}
            {/*{post.image_url ? (*/}
            {/*  <p>*/}
            {/*    <img src={post.image_url} alt="Post Image" className={"post-image"}/>*/}
            {/*  </p>*/}
            {/*) : null}*/}
            {post.image_url && (
              <img
                src={post.image_url}
                alt="Post Image"
                className={"post-image"}
              />
            )}
            <p>Published at: {formatDate(post.created_at)}</p>
            <div>
              <button onClick={() => deletePostHandler(post.id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PostsList;
