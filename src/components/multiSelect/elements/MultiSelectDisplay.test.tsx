import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for additional matchers like toHaveClass
import MultiSelectDisplay from "./MultiSelectDisplay";

describe("MultiSelectDisplay", () => {
  const onClick = jest.fn();

  test("renders placeholder when no options are selected", () => {
    const placeholder = "Select Options";

    const { getByText } = render(
      <MultiSelectDisplay
        isHidden={false}
        onClick={onClick}
        selectedOptions={[]}
        placeholder={placeholder}
      />
    );

    const placeholderElement = getByText(placeholder);
    expect(placeholderElement).toBeInTheDocument();
  });

  test("handles click event correctly", () => {
    const selectedOptions = ["Option 1", "Option 2", "Option 3"];
    const placeholder = "Select Options";

    render(
      <MultiSelectDisplay
        isHidden={false}
        onClick={onClick}
        selectedOptions={selectedOptions}
        placeholder={placeholder}
      />
    );

    fireEvent.click(screen.getByTestId("selected-options"));
    expect(onClick).toHaveBeenCalled();
  });

  test("hides options when isHidden is true", () => {
    const selectedOptions = ["Option 1", "Option 2", "Option 3"];
    const placeholder = "Select Options";

    const { container } = render(
      <MultiSelectDisplay
        isHidden={true}
        onClick={onClick}
        selectedOptions={selectedOptions}
        placeholder={placeholder}
      />
    );

    expect(container.firstChild).toHaveClass("hidden");
  });
});
