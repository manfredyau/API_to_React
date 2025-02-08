import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService.js";
import PostForm from "./PostForm.jsx";
import { objectToFormData } from "../../utils/FormDataHelper.js";

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
      // const postFormObj = new FormData();
      // postFormObj.append("post[title]", postForm.title);
      // postFormObj.append("post[body]", postForm.body);
      // postFormObj.append("post[image]", postForm.image);
      const formDataObj = objectToFormData({ post: postForm });
      await updatePost(id, formDataObj);
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
