import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService.js";
import PostForm from "./PostForm.jsx";

export default function NewPostForm() {
  const navigate = useNavigate();
  const handleCreateSubmit = async (formData) => {
    // In face, formData is not a FormData object, it's just an object with key-value pairs
    // So we need to convert it to a FormData object
    const formDataObj = new FormData();
    formDataObj.append("post[title]", formData.title);
    formDataObj.append("post[body]", formData.body);
    formDataObj.append("post[image]", formData.image);

    try {
      const response = await createPost(formDataObj);
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
