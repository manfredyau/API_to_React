import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import { fireEvent, screen, render, waitFor } from "@testing-library/react";
import NewPostForm from "./NewPostForm.jsx";
import { afterEach, describe, expect, it } from "@jest/globals";
import { createPost } from "../../services/postService";
import { act } from "react";

jest.mock("../../services/postService", () => ({
  createPost: jest.fn(() => ({
    id: 1,
    title: "My New Post",
    body: "This is the body of my new post.",
  })),
}));
describe("NewPostForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders NewPostForm and allows typing", () => {
    render(
      <Router>
        <NewPostForm />
      </Router>
    );
    const titleInput = screen.getByLabelText("Title:");
    const bodyInput = screen.getByLabelText("Body:");
    const submitButton = screen.getByRole("button", "Create a new post");
    const expectedTitle = "My New Post";
    const expectedBody = "This is the body of my new post.";

    fireEvent.change(titleInput, { target: { value: expectedTitle } });
    fireEvent.change(bodyInput, { target: { value: expectedBody } });

    expect(titleInput.value).toBe(expectedTitle);
    expect(bodyInput.value).toBe(expectedBody);
    expect(submitButton).toBeInTheDocument();
  });

  it("calls createPost when form is submitted", async () => {
    const { container } = render(
      <Router initialEntries={["/new"]}>
        <Routes>
          <Route path="/" element={<div>Post List</div>} />
          <Route path="/new" element={<NewPostForm />} />
          <Route path="posts/:id" element={<div>Post Detail</div>} />
        </Routes>
      </Router>
    );
    const titleInput = screen.getByLabelText("Title:");
    const bodyInput = screen.getByLabelText("Body:");
    const submitButton = screen.getByRole("button", "Create a new post");
    const expectedTitle = "My New Post";
    const expectedBody = "This is the body of my new post.";

    fireEvent.change(titleInput, { target: { value: expectedTitle } });
    fireEvent.change(bodyInput, { target: { value: expectedBody } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(createPost).toHaveBeenCalledTimes(1);

    console.log(container.innerHTML);
    await waitFor(() => {
      expect(screen.getByText("Post Detail")).toBeInTheDocument();
    });
  });

  it("Shows error message when createPost fails", async () => {
    const error = new Error("Failed to create post");
    createPost.mockImplementation(() => {
      return Promise.reject(error);
    });

    console.error = jest.fn();

    render(
      <Router>
        <NewPostForm />
      </Router>
    );
    const titleInput = screen.getByLabelText(/Title:/);
    const bodyInput = screen.getByLabelText("Body:");
    const submitButton = screen.getByRole("button", "Create a new post");
    const expectedTitle = "My New Post";
    const expectedBody = "This is the body of my new post.";

    fireEvent.change(titleInput, { target: { value: expectedTitle } });
    fireEvent.change(bodyInput, { target: { value: expectedBody } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Failed to create post: ",
        error
      );
    });
  });
});
