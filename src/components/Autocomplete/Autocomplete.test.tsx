import { render, screen, fireEvent } from "@testing-library/react-native";

import { Autocomplete } from "./Autocomplete";

describe("Autocomplete", () => {
  const mockData = [
    { id: "1", name: "Florianopolis", region: "Santa Catarina" },
    { id: "2", name: "Florida", region: "Camaguey" },
    { id: "3", name: "Florence", region: "Toscana" },
  ];

  const mockOnClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should renders the autocomplete list items correctly", () => {
    render(<Autocomplete autocompleteNames={mockData} onClickInSearchedCity={mockOnClick} />);

    mockData.forEach((item) => {
      expect(screen.getByText(`${item.name} - ${item.region}`)).toBeTruthy();
    });
  });

  it("should calls the onClickInSearchedCity function with the correct item name on item click", () => {
    render(<Autocomplete autocompleteNames={mockData} onClickInSearchedCity={mockOnClick} />);

    fireEvent.press(screen.getByText("Florida - Camaguey"));
    expect(mockOnClick).toHaveBeenCalledWith("Florida");
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should renders an empty list without errors if autocompleteNames is empty", () => {
    render(<Autocomplete autocompleteNames={[]} onClickInSearchedCity={mockOnClick} />);

    expect(screen.queryByText("Florianopolis - Santa Catarina")).toBeNull();
    expect(screen.queryByText("Florida - Camaguey")).toBeNull();
    expect(screen.queryByText("Florence - Toscana")).toBeNull();
  });
});
