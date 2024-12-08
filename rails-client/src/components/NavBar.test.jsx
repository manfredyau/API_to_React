import NavBar from "./NavBar";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("NavBar component", () => {
  const renderNavBar = () => {
    return render(<NavBar />, { wrapper: MemoryRouter });
  };
  test("render both links", () => {
    renderNavBar();
    expect(screen.getByText("Posts List")).toBeInTheDocument();
    expect(screen.getByText("New Post")).toBeInTheDocument();
  });
});
