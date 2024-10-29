import { render, screen } from "@testing-library/react-native";
import { Loading } from "./Loading";

describe("Loading Component", () => {
  it("should render the ActivityIndicator", () => {
    render(<Loading />);
    expect(screen.getByTestId("activity-indicator")).toBeTruthy();
  });

  it("should have the correct size and color", () => {
    render(<Loading />);
    const activityIndicator = screen.getByTestId("activity-indicator");

    expect(activityIndicator.props.size).toBe("large");
    expect(activityIndicator.props.color).toBe("red");
  });
});
