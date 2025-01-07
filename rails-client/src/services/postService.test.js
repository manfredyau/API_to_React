import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();
import {
  fetchAllPosts,
  deletePost,
  fetchPost,
  createPost,
  updatePost,
} from "./postService";

import { afterAll, beforeEach, describe, expect, it } from "@jest/globals";

jest.mock("../constant.js", () => ({
  API_URL: "http://your-test-api-url.com",
}));

describe("Post API service", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  // Test cases for fetchAllPosts
  it("should fetch all posts", async () => {
    const mockData = {
      id: 1,
      title: "Test Post",
      body: "This is a test post",
    };
    fetch.mockResponse(JSON.stringify(mockData));
    const response = await fetchAllPosts();
    expect(response).toEqual(mockData);
  });

  // Show
  it("fetches a single post by id", async () => {
    const postId = 1;
    const mockData = {
      id: postId,
      title: "Test Post",
      body: "This is a test post",
    };
    fetch.mockResponse(JSON.stringify(mockData));
    const response = await fetchPost(postId);
    expect(response).toEqual(mockData);
  });

  // New
  it("creates a new post", async () => {
    const formData = {
      title: "Test Post",
      body: "This is a test post",
    };
    const mockData = {
      id: 1,
      title: "Test Post",
      body: "This is a test post",
    };
    fetch.mockResponse(JSON.stringify(mockData));
    const response = await createPost(formData);
    expect(response).toEqual(mockData);
  });

  // Create
  // Update
  it("updates a post", async () => {
    const postId = 1;
    const formData = {
      title: "Test Post",
      body: "This is a test post",
    };
    const mockData = {
      id: postId,
      title: "Test Post",
      body: "This is a test post",
    };
    fetch.mockResponse(JSON.stringify(mockData));
    const response = await updatePost(postId, formData);
    expect(response).toEqual(mockData);
  });
  // Delete
  it("deletes a post", async () => {
    const postId = 1;
    fetch.mockResponse(null, { status: 204 });
    const response = await deletePost(postId);
    expect(response).toBe(null);
  });

  // This is the unhappy path zone
  it("throws an error when the fetchAllPosts response is not ok", async () => {
    fetch.mockResponse(JSON.stringify({ error: "Not found" }), { status: 500 });
    await expect(fetchAllPosts()).rejects.toThrow();
  });

  it("throws an error when the fetchPost response is not ok", async () => {
    const postId = 1;
    fetch.mockResponse(JSON.stringify({ error: "Not found" }), { status: 500 });
    const response = fetchPost(postId);
    await expect(response).rejects.toThrow();
  });

  it("throws an error when the createPost response is not ok", async () => {
    const formData = {
      title: "Test Post",
      body: "This is a test post",
    };
    fetch.mockResponse(JSON.stringify({ error: "Not found" }), { status: 500 });
    await expect(createPost(formData)).rejects.toThrow();
  });

  it("throws an error when the updatePost response is not ok", async () => {
    const postId = 1;
    const formData = {
      title: "Test Post",
      body: "This is a test post",
    };
    fetch.mockResponse(JSON.stringify({ error: "Not found" }), { status: 500 });
    await expect(updatePost(postId, formData)).rejects.toThrow();
  });

  it("throws an error when the deletePost response is not ok", async () => {
    const postId = 1;
    fetch.mockResponse(null, { status: 500 });
    await expect(deletePost(postId)).rejects.toThrow();
  });

  // Delete throws an error if the response is not OK and the status is not 204
  it("throws an error when the deletePost response is not ok and the status is not 204", async () => {

  });
});
