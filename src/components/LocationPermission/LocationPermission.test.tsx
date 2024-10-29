import { fireEvent, render, screen } from "@testing-library/react-native";
import { LocationPermission } from "./LocationPermission";

describe("LocationPermission", () => {
  const mockGoToSettings = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should renders correctly with the expected texts", () => {
    render(<LocationPermission goToSettings={mockGoToSettings} />);

    expect(screen.getByText("A permissão de localização é necessária")).toBeTruthy();
    expect(
      screen.getByText(
        "As informações sobre a previsão do tempo da sua localização não estarão disponíveis sem a permissão de localização. Por favor permita que WeatherApp acesse a localização deste dispositivo",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Abrir configuração de permissões")).toBeTruthy();
  });

  it("should calls `goToSettings` when the button is pressed", () => {
    render(<LocationPermission goToSettings={mockGoToSettings} />);

    const button = screen.getByText("Abrir configuração de permissões");
    fireEvent.press(button);

    expect(mockGoToSettings).toHaveBeenCalledTimes(1);
  });
});
