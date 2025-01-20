import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Login } from "../screens/login/login";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockSetIsLoggedIn = jest.fn();
jest.mock("../hooks/useLocalStorage", () => ({
  useLocalStorage: () => [true, mockSetIsLoggedIn],
}));

describe("Login", () => {
  it("renders login form", () => {
    render(<Login />);
    expect(screen.getByText("Pokemon App")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("shows error message for invalid credentials", () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "asael" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "admin" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("logs in with correct credentials", () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "admin" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
    expect(mockPush).toHaveBeenCalledWith("/pokedex");
  });
});
