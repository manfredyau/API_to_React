import { useEffect, useState } from "react";
import { deletePost } from "../../services/postService.js";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import "./PostImage.css";
import useURLSearchParam from "../../hooks/useURLSearchParam.js";
import usePostsData from "../../hooks/usePostsData.js";

function PostsList() {
  // posts: {
  //   id: number,
  //   title: string,
  //   body: string,
  //   created_at: string,
  //   updated_at: string,
  //   image_url?: string
  // }[]
  const [posts, setPosts] = useState([]);
  // Calling setSearchTerm will not trigger data fetching, but only update the SearchBar value
  const [searchTerm, setSearchTerm] = useState("");
  // Calling setDebouncedSearchTerm will update the URL and trigger data fetching
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search");
  const {
    posts: fetchedPosts,
    loading,
    error,
  } = usePostsData(debouncedSearchTerm);

  // Fetch posts from the API
  useEffect(() => {
    if (fetchedPosts) setPosts(fetchedPosts);
  }, [fetchedPosts]);
  console.log("test");
  function formatDate(date) {
    date = new Date(date);
    return date.toLocaleString();
  }

  const deletePostHandler = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (e) {
      console.error("An error occurred while deleting post: ", e);
    }
  };

  function handleImmediateSearchChange(searchValue) {
    setSearchTerm(searchValue);
  }

  function handleDebouncedSearchChange(searchValue) {
    setDebouncedSearchTerm(searchValue);
  }

  return (
    <div>
      <SearchBar
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {posts.map((post) => {
        return (
          <div key={post.id} className="post-container">
            <h2>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            {/*Check if the post has an image and display it if it does*/}
            {/*{post.image_url ? (*/}
            {/*  <p>*/}
            {/*    <img src={post.image_url} alt="Post Image" className={"post-image"}/>*/}
            {/*  </p>*/}
            {/*) : null}*/}
            {post.image_url && (
              <img
                src={post.image_url}
                alt="Post Image"
                className={"post-image"}
              />
            )}
            <p>Published at: {formatDate(post.created_at)}</p>
            <div>
              <button onClick={() => deletePostHandler(post.id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PostsList;
