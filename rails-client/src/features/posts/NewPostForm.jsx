import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService.js";

export default function NewPostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      body,
    };

    // console.log("FORM DATA: " + JSON.stringify(formData));

    try {
      const json = await createPost(formData);
      navigate(`/posts/${json.id}`);
    } catch (e) {
      console.error("Failed to create post: ",e);
    }
  };

  return (
    <div>
      <h2>Create a new post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            id="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="bodyInput">Body:</label>
          <textarea
            id="bodyInput"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Create a new post</button>
        </div>
      </form>
    </div>
  );
}
