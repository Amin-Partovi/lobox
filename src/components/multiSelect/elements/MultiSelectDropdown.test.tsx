import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for additional matchers like toHaveClass
import MultiSelectDropdown from "./MultiSelectDropdown";

describe("MultiSelectDropdown", () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const onClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders options correctly", () => {
    const selectedOptions = ["Option 1"];

    const { getByText } = render(
      <MultiSelectDropdown
        options={options}
        onClick={onClick}
        selectedOptions={selectedOptions}
      />
    );

    options.forEach((option) => {
      const optionElement = getByText(option);
      expect(optionElement).toBeInTheDocument();

      if (selectedOptions.includes(option)) {
        expect(optionElement).toHaveClass("selected");
      } else {
        expect(optionElement).not.toHaveClass("selected");
      }
    });
  });

  test("handles click events correctly", () => {
    const { getByText } = render(
      <MultiSelectDropdown
        options={options}
        onClick={onClick}
        selectedOptions={[]}
      />
    );

    options.forEach((option) => {
      const optionElement = getByText(option);
      fireEvent.click(optionElement);
      expect(onClick).toHaveBeenCalledWith(option);
    });
  });
});
