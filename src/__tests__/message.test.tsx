import { Message } from "@/components/message/message";
import { render } from "@testing-library/react";

describe("<Message />", () => {
  it("should render info message", () => {
    const { getByRole } = render(
      <Message message="No pokemon matches this search" />
    );
    expect(getByRole("paragraph").textContent).toBe(
      "No pokemon matches this search"
    );
  });

  it("should render error message", () => {
    const { getByRole } = render(<Message message="Error loading pokemons" />);
    expect(getByRole("paragraph").textContent).toBe("Error loading pokemons");
  });
});
