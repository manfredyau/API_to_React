import { POSTS_API_URL } from "../constant.js";
import { SEARCH_API_URL } from "../constant.js";

async function fetchAllPosts() {
  const response = await fetch(`${POSTS_API_URL}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function searchPosts(query) {
  const response = await fetch(`${SEARCH_API_URL}/posts?q=${query}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function deletePost(id) {
  const response = await fetch(`${POSTS_API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 204) {
    return null;
  } else {
    throw new Error(response.statusText);
  }
}

async function fetchPost(id) {
  const response = await fetch(`${POSTS_API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function createPost(formData) {
  const response = await fetch(POSTS_API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function updatePost(id, formData) {
  const response = await fetch(`${POSTS_API_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export {
  fetchAllPosts,
  searchPosts,
  deletePost,
  fetchPost,
  createPost,
  updatePost,
};
