import { useState } from "react";
import PropTypes from "prop-types";

function PostForm({ post = null, onSubmit, headerText, buttonText }) {
  const [formData, setFormData] = useState(
    post || {
      title: "",
      body: "",
      image: null,
    }
  );

  return (
    <div>
      <h2>{headerText}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
      >
        <div>
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            id="titleInput"
            value={formData.title}
            name="post[title]"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="bodyInput">Body:</label>
          <textarea
            id="bodyInput"
            value={formData.body}
            name="post[body]"
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="fileInput">image:</label>
          <input
            type="file"
            id="fileInput"
            name="post[image]"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />
        </div>
        <div>
          <button type="submit">{buttonText}</button>
        </div>
      </form>
    </div>
  );
}

PostForm.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default PostForm;
