import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

jest.mock("../features/posts/PostsList.jsx", () => {
  const MockPostsList = () => {
    return <div>This is the mocked PostsList component</div>;
  };
  return MockPostsList;
});

jest.mock("../features/posts/PostDetails.jsx", () => {
  const MockPostDetails = () => {
    return <div>This is the mocked PostDetails component</div>;
  };
  return MockPostDetails;
});

jest.mock("../features/posts/NewPostForm.jsx", () => {
  const MockNewPostForm = () => {
    return <div>This is the mocked NewPostForm component</div>;
  };
  return MockNewPostForm;
});

jest.mock("../features/posts/EditPostForm.jsx", () => {
  const MockEditPostForm = () => {
    return <div>This is the mocked EditPostForm component</div>;
  };
  return MockEditPostForm;
});
jest.mock("../constant.js", () => {
  return { API_URL: "https://your-test-api-url" };
});
describe("AppRoutes", () => {
  const renderWithRouter = (ui, { initialEntries = ["/"] } = {}) => {
    return render(ui, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      ),
    });
  };

  it("root path should render PostsList component", () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ["/"] });
    expect(screen.getByText(/PostsList/)).toBeInTheDocument();
  });

  it("post details path should render PostDetails component", () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ["/posts/1"] });
    const expectedText = "This is the mocked PostDetails component";
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it("/new path should render NewPostForm component", () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ["/new"] });
    const expectedText = "This is the mocked NewPostForm component";
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it("/posts/:id/edit path should render EditPostForm component with post data", () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ["/posts/1/edit"] });
    const expectedText = "This is the mocked EditPostForm component";
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
