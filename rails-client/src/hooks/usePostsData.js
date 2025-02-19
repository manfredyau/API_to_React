import { useState, useEffect } from "react";
import { fetchAllPosts, searchPosts } from "../services/postService.js";
import PropTypes from "prop-types";

export default function usePostsData(searchTerm) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let postsData;
        if (searchTerm) {
          postsData = await searchPosts(searchTerm);
        } else {
          postsData = await fetchAllPosts();
        }
        setPosts(postsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch posts", error);
        setError(error);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [searchTerm]);
  return { posts, isLoading, error };
}

usePostsData.propTypes = {
  searchTerm: PropTypes.string,
};
