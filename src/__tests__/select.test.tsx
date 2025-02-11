import { render, screen, fireEvent } from "@testing-library/react";
import Select from "components/select/select";
import "@testing-library/jest-dom";

describe("Select Component", () => {
  const options = [30, 50, 100];
  const value = 50;
  const handleChange = jest.fn();

  function renderSelect() {
    return render(
      <Select onChange={handleChange} options={options} value={value} />
    );
  }

  it("renders select component with options", () => {
    renderSelect();
    options.forEach((option) => {
      expect(
        screen.getByRole("option", { name: option.toString() })
      ).toBeInTheDocument();
    });
  });

  it("calls onChange handler when an option is selected", () => {
    renderSelect();
    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: 100 } });
    expect(handleChange).toHaveBeenCalledWith(100);
  });

  it("displays the correct selected value", () => {
    renderSelect();
    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
    expect(selectElement.value).toBe(value.toString());
  });
});
