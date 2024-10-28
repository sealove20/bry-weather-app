import { formatDate } from "./date";

describe("formatDate", () => {
  it("should format 2024-10-28 to 28/10", () => {
    expect(formatDate("2024-10-28")).toBe("28/10");
  });
});
