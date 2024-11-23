import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constant.js";

function EditPostForm() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentPost = async () => {
      const response = await fetch(`${API_URL}/${id}`);
      try {
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          throw response;
        }
      } catch (error) {
        console.log("An error occurred:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    currentPost();
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    const updatePost = async () => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: post.title,
          body: post.body,
        }),
      });
      try {
        if (response.ok) {
          const json = await response.json();
          console.log("Post updated successfully: ", json);
          navigate(`/posts/${id}`);
        } else {
          throw response;
        }
      } catch (error) {
        console.log("An error occurred:", error);
        setError(error.message);
      }
    };

    console.log("post: ", post)
    updatePost();
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
