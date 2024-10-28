import { formatTime } from "./time";

describe("formatTime", () => {
  it('should format "2024-10-29 00:00" to "00:00"', () => {
    expect(formatTime("2024-10-29 00:00")).toBe("00:00");
  });

  it('should format "2024-10-29 12:30" to "12:30"', () => {
    expect(formatTime("2024-10-29 12:30")).toBe("12:30");
  });

  it('should format "2024-10-29 23:59" to "23:59"', () => {
    expect(formatTime("2024-10-29 23:59")).toBe("23:59");
  });

  it("should handle times with single-digit hours", () => {
    expect(formatTime("2024-10-29 03:05")).toBe("03:05");
  });
});
