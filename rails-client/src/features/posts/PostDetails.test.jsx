import PostDetails from "./PostDetails.jsx";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { afterEach, describe, expect, it } from "@jest/globals";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as postServices from "../../services/postService.js";

jest.mock("../../services/postService.js", () => ({
  fetchPost: jest.fn(),
  deletePost: jest.fn(),
}));

describe("PostDetails Component", () => {
  const mockPost = {
    id: 1,
    title: "Test Post",
    body: "This is a test post",
    user: {
      id: 1,
      name: "John Doe",
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <MemoryRouter initialEntries={[`/posts/${mockPost.id}`]}>
        <Routes>
          <Route path="/" element={<div>Post List</div>} />
          <Route path="/posts/:id" element={<PostDetails />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("should render without crashing", async () => {
    postServices.fetchPost.mockResolvedValue(mockPost);
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText(mockPost.title)).toBeInTheDocument();
      expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    });
  });

  it("set error message when post is not found", async () => {
    const e = new Error("Post not found");
    postServices.fetchPost.mockRejectedValue(e);
    const consoleSpy = jest.spyOn(console, "error");
    consoleSpy.mockImplementation(jest.fn());

    renderComponent();
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Error fetching post: ", e);
    });

    consoleSpy.mockRestore();
  });

  it("should delete post when delete button is clicked", async () => {
    postServices.fetchPost.mockResolvedValue(mockPost);
    postServices.deletePost.mockResolvedValue(null);
    renderComponent();
    await waitFor(() => {
      const deleteButton = screen.getByText("Delete");
      expect(deleteButton).toBeInTheDocument();
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Post List")).toBeInTheDocument();
    });
  });

  it("should set error message when deleting post fails", async () => {
    const e = new Error("Failed to delete post");
    postServices.fetchPost.mockResolvedValue(mockPost);
    postServices.deletePost.mockRejectedValue(e);
    const consoleSpy = jest.spyOn(console, "error");
    consoleSpy.mockImplementation(jest.fn());
    renderComponent();

    await waitFor(() => {
      fireEvent.click(screen.getByText("Delete"));
    });

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Error deleting post: ", e);
    });
    consoleSpy.mockRestore();
  });
});
