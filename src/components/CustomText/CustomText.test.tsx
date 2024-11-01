import { render, screen } from "@testing-library/react-native";
import { fontSize as fontSizeTokens } from "@/tokens/fontSize";
import { CustomText } from "./CustomText";
import { StyleSheet } from "react-native";

describe("CustomText", () => {
  it("should renders correctly with the extra small size", () => {
    render(<CustomText size="xsm">Extra Small Text</CustomText>);
    const textElement = screen.getByText("Extra Small Text");

    expect(textElement).toBeTruthy();
    expect(textElement.props.style[1].fontSize).toBe(fontSizeTokens.xsm);
  });

  it("should renders correctly with the small size", () => {
    render(<CustomText size="sm">Small Text</CustomText>);
    const textElement = screen.getByText("Small Text");

    expect(textElement).toBeTruthy();
    expect(textElement.props.style[1].fontSize).toBe(fontSizeTokens.sm);
  });

  it("should renders correctly with the medium size", () => {
    render(<CustomText size="md">Medium Text</CustomText>);
    const textElement = screen.getByText("Medium Text");

    expect(textElement).toBeTruthy();
    expect(textElement.props.style[1].fontSize).toBe(fontSizeTokens.md);
  });

  it("should renders correctly with the large size", () => {
    render(<CustomText size="lg">Large Text</CustomText>);
    const textElement = screen.getByText("Large Text");

    expect(textElement).toBeTruthy();
    expect(textElement.props.style[1].fontSize).toBe(fontSizeTokens.lg);
  });

  it("should renders correctly with the extra large size", () => {
    render(<CustomText size="xl">Extra Large Text</CustomText>);
    const textElement = screen.getByText("Extra Large Text");

    expect(textElement).toBeTruthy();
    expect(textElement.props.style[1].fontSize).toBe(fontSizeTokens.xl);
  });

  it("should applies custom styles correctly", () => {
    const customStyle = StyleSheet.create({
      textStyle: { fontWeight: "bold", textAlign: "center" },
    });
    const { getByText } = render(
      <CustomText size="lg" style={customStyle.textStyle}>
        Test Text
      </CustomText>,
    );

    const textElement = getByText("Test Text");
    expect(textElement.props.style[2].fontWeight).toBe(customStyle.textStyle.fontWeight);
    expect(textElement.props.style[2].textAlign).toBe(customStyle.textStyle.textAlign);
  });
});
