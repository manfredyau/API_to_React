import { useState, useEffect } from "react";
import { fetchAllPosts, searchPosts } from "../services/postService.js";
import PropTypes from "prop-types";

export default function usePostsData(searchTerm, page = 1) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let data;
        if (searchTerm) {
          data = await searchPosts(searchTerm, page);
        } else {
          data = await fetchAllPosts(page);
        }
        if (data.posts) {
          setPosts(data.posts);
          setTotalPosts(data.total_count);
          setPerPage(data.per_page);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch posts", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page, searchTerm]);
  return { posts, loading, error, totalPosts, perPage, page };
}

usePostsData.propTypes = {
  searchTerm: PropTypes.string,
};
