import { useParams } from "react-router-dom";
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
        {post.title + " " + post.body}
      </div>
    );
  }
}

export default PostDetails;
