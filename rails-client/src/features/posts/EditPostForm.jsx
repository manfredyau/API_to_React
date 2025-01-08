import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService.js";
import PostForm from "./PostForm.jsx";

function EditPostForm() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPost = async () => {
      try {
        const response = await fetchPost(id);
        setPost(response);
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    };

    currentPost();
  }, [id]);

  // The postForm data will be passed by PostForm component
  async function handleEditSubmit(postForm) {
    try {
      await updatePost(id, postForm);
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <PostForm
      post={post}
      onSubmit={handleEditSubmit}
      headerText={"Edit Post"}
      buttonText={"Update"}
    />
  );
}

export default EditPostForm;
