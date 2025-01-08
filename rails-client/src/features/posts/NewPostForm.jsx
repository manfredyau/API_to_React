import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService.js";
import PostForm from "./PostForm.jsx";

export default function NewPostForm() {
  const navigate = useNavigate();
  const handleCreateSubmit = async (formData) => {
    try {
      const response = await createPost(formData);
      navigate(`/posts/${response.id}`);
    } catch (e) {
      console.error("Failed to create post: ", e);
    }
  };

  return (
    <PostForm
      onSubmit={handleCreateSubmit}
      headerText={"Create a new post"}
      buttonText={"Create"}
    />
  );
}
