import PostsList from "./PostsList";
import {expect, it} from "@jest/globals";
import {MemoryRouter} from "react-router-dom";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import * as postsService from "../../services/postService.js";

jest.mock("../../constant.js", () => ({
  API_URL: "http://your-test-api-url",
}));

jest.mock("../../services/postService.js", () => ({
  fetchAllPosts: jest.fn(),
  deletePost: jest.fn(),
}));

global.console.error = jest.fn();

describe("PostsList component", () => {
  const mockedPosts = [
    {
      id: 1,
      title: "Post 1",
      body: "Content 1",
    },
    {
      id: 2,
      title: "Post 2",
      body: "Content 2",
    },
  ];

  beforeEach(() => {
    postsService.fetchAllPosts.mockResolvedValue(mockedPosts);
    postsService.deletePost.mockResolvedValue(null);
  });

  it("render the list of posts", async () => {
    render(<PostsList/>, {wrapper: MemoryRouter});
    await waitFor(() => screen.getByText("Post 1"));
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });

  it("delete a post when the delete button is clicked", async () => {
    render(<PostsList/>, {wrapper: MemoryRouter});
    const postText = "Post 1";
    await waitFor(() => screen.getByText(postText));
    fireEvent.click(screen.getAllByText("Delete")[0]);

    await waitFor(() => expect(postsService.deletePost).toHaveBeenCalled());

    expect(screen.queryByText(postText)).not.toBeInTheDocument();
  });

  it("Sets error and loading to false when fetching posts fails", async () => {
    const error = new Error("Failed to fetch posts");
    postsService.fetchAllPosts.mockRejectedValue(error)

    render(<PostsList/>, {wrapper: MemoryRouter});
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Failed to fetch posts",
        error);
    });
  })

  it("Sets error and loading to false when deleting a post fails", async () => {
    const deleteError = new Error("Failed to delete post");
    postsService.deletePost.mockRejectedValue(deleteError);
    render(<PostsList/>, {wrapper: MemoryRouter});
    await waitFor(() => {
      screen.getByText("Post 1");
    })
    fireEvent.click(screen.getAllByText("Delete")[0]);
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("An error occurred while deleting post: ",
        deleteError);
    })
  })
});
