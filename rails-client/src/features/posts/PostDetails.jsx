import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../constant.js";
import { useEffect, useState } from "react";

function PostDetails() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const json = await response.json();
          setPost(json);
        } else {
          throw response;
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {"ID: " + post.id}
        <br />
        <h2>{post.title}</h2>
        <h3>{post.body}</h3>
        <Link to={`/posts/${post.id - 1}`}>Previous Post</Link>
        <div>Current ID: {id}</div>
      </div>
    );
  }
}

export default PostDetails;
