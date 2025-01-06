import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService.js";

function EditPostForm() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentPost = async () => {
      try {
        const response = await fetchPost(id);
        setPost(response);
      } catch (error) {
        console.error("An error occurred: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    currentPost();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const postData = {
      title: post.title,
      body: post.body,
    };

    try {
      await updatePost(id, postData);
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("An error occurred: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Edit post form here</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="post-title">Title:</label>
          <br />
          <input
            type="text"
            id="post-title"
            name="title"
            value={post?.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="post-body">Body:</label>
          <br />
          <textarea
            id="post-body"
            name="body"
            value={post?.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
          />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default EditPostForm;
