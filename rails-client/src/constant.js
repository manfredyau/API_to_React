export const POSTS_API_URL =
  import.meta.env.NODE_ENV === "test"
    ? "https://mocked-api-url"
    : import.meta.env.VITE_POSTS_API_URL;

export const SEARCH_API_URL =
  import.meta.env.NODE_ENV === "test"
    ? "https://mocked-api-url"
    : import.meta.env.VITE_SEARCH_API_URL;
