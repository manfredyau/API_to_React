import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, fetchPost } from "../../services/postService.js";
import { useEffect, useState } from "react";

function PostDetails() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const json = await fetchPost(id);
        console.log(json);
        setPost(json);
      } catch (e) {
        console.error("Error fetching post: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentPost();
  }, [id]);

  async function deletePostHandler() {
    try {
      await deletePost(id);
      navigate("/");
    } catch (e) {
      console.error("Error deleting post: ", e);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  } else if (post) {
    return (
      <div>
        {"ID: " + post.id}
        <br />
        <h2>{post.title}</h2>
        <h3>{post.body}</h3>
        <p><img src={post.image_url} alt="There is no image for this post" className={"post-image"}/></p>
        <Link to={`/posts/${post.id - 1}`}>Previous Post</Link>
        {" | "}
        <Link to={`/posts/${post.id}/edit`}>Edit</Link>
        {" | "}
        <button onClick={deletePostHandler}>Delete</button>
      </div>
    );
  }
}

export default PostDetails;
