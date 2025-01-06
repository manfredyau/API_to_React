import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EditPostForm from "./EditPostForm.jsx";
import { fetchPost, updatePost } from "../../services/postService.js";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";

jest.mock("../../services/postService", () => ({
  fetchPost: jest.fn(),
  updatePost: jest.fn(),
}));

global.console.error = jest.fn();

describe("EditPostForm", () => {
  const mockPost = {
    id: 1,
    title: "Test Title",
    body: "Test Body",
  };
  beforeEach(() => {
    fetchPost.mockResolvedValue(mockPost);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderForm() {
    render(
      <MemoryRouter initialEntries={["/posts/1/edit"]}>
        <Routes>
          <Route path="/posts/:id/edit" element={<EditPostForm />} />
          <Route path="/posts/:id" element={<div>Post Detail</div>} />
        </Routes>
      </MemoryRouter>
    );
  }

  it("should render without crashing", async () => {
    await act(async () => {
      renderForm();
    });

    await waitFor(() => {
      expect(fetchPost).toHaveBeenCalledTimes(1);
      expect(screen.getByDisplayValue(mockPost.title)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockPost.body)).toBeInTheDocument();
    });
  });

  it("should update post on submit", async () => {
    await act(async () => {
      renderForm();
    });

    expect(fetchPost).toHaveBeenCalledTimes(1);

    const titleInput = screen.getByLabelText(/Title/i);
    const bodyInput = screen.getByLabelText(/Body/i);
    const submitButton = screen.getByText(/update/i);

    const newPost = {
      id: 1,
      title: "A new post title",
      body: "A new post body",
    };

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: newPost.title } });
      fireEvent.change(bodyInput, { target: { value: newPost.body } });
      fireEvent.click(submitButton);
    });

    expect(updatePost).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Post Detail")).toBeInTheDocument();
  });

  it("should show error message on update failure", async () => {
    const error = new Error("Failed to update post");
    updatePost.mockRejectedValue(error);

    const consoleSpy = jest.spyOn(console, "error");
    consoleSpy.mockImplementation(jest.fn());

    renderForm();

    await waitFor(() => {
      fireEvent.click(screen.getByText(/update/i));
    });
    await waitFor(() => {
      expect(updatePost).toHaveBeenCalledTimes(1);
    });
    expect(consoleSpy).toHaveBeenCalledWith("An error occurred: ", error);
  });

  it("handles errors when fetching post", async () => {
    const error = new Error("Failed to fetch post");
    fetchPost.mockRejectedValue(error);

    await act(async () => {
      renderForm();
    });

    expect(fetchPost).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith("An error occurred: ", error);
  });
});
