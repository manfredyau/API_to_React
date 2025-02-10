import { fireEvent, render } from "@testing-library/react";
import PostForm from "./PostForm.jsx";
import { describe, expect, it } from "@jest/globals";
import { act } from "react";

describe("PostForm", () => {
  it("renders default inputs when no post is provided", () => {
    const { getByLabelText, debug } = render(
      <PostForm
        buttonText={"Create Post"}
        headerText={"Create a new post"}
        onSubmit={() => {}}
      />
    );
    expect(getByLabelText(/Title/i)).toBeInTheDocument();
    expect(getByLabelText(/body/i)).toBeInTheDocument();
    debug();
  });

  it("renders passed in post date", () => {
    const mockPost = {
      title: "Test Title",
      body: "Test Body",
    };
    const { getByLabelText } = render(
      <PostForm
        post={mockPost}
        buttonText={"Update Post"}
        headerText={"Edit a post"}
        onSubmit={() => {}}
      />
    );
    expect(getByLabelText(/Title/i)).toHaveValue(mockPost.title);
    expect(getByLabelText(/body/i)).toHaveValue(mockPost.body);
  });

  it("updates input value on change", () => {
    const mockPost = {
      title: "Test Title",
      body: "Test Body",
    };
    const { getByLabelText } = render(
      <PostForm
        post={mockPost}
        buttonText={"Update Post"}
        headerText={"Edit a post"}
        onSubmit={() => {}}
      />
    );

    const titleInput = getByLabelText(/Title/i);
    const bodyInput = getByLabelText(/body/i);
    expect(titleInput).toHaveValue(mockPost.title);
    expect(bodyInput).toHaveValue(mockPost.body);
    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(bodyInput, { target: { value: "New Body" } });
    expect(titleInput).toHaveValue("New Title");
    expect(bodyInput).toHaveValue("New Body");
  });

  it("calls onSubmit with updated post data", async () => {
    const mockPost = {
      title: "Test Title",
      body: "Test Body",
      image: null,
    };
    const onSubmit = jest.fn();
    const { getByLabelText, getByRole } = render(
      <PostForm
        post={mockPost}
        buttonText={"Update Post"}
        headerText={"Edit a post"}
        onSubmit={onSubmit}
      />
    );

    const titleInput = getByLabelText(/Title/i);
    const bodyInput = getByLabelText(/body/i);
    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(bodyInput, { target: { value: "New Body" } });
    await act(async () => {
      fireEvent.click(getByRole("button", { name: "Update Post" }));
    });
    expect(onSubmit).toHaveBeenCalledWith({
      title: "New Title",
      body: "New Body",
      image: null,
    });
  });

  it("handle image upload", async () => {
    const mockSubmit = jest.fn();
    const consoleSpy = jest.spyOn(console, "log");
    consoleSpy.mockImplementation(() => {});
    const { getByLabelText } = render(
      <PostForm
        buttonText={"Create Post"}
        headerText={"Create a new post"}
        onSubmit={mockSubmit}
      />
    );
    const fileInput = getByLabelText(/image/i);
    const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(consoleSpy).toHaveBeenCalledWith(file);
  });
});
