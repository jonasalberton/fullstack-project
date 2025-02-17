import { describe, it, expect } from "vitest";
import { formatRelativeDifference, formatDate } from "../date";

describe("Date Utils", () => {
  it("should correctly format relative difference for dates", () => {
    const pastDate = new Date("2020-01-02T18:00:00");
    const result = formatRelativeDifference(pastDate, new Date("2025-02-17T18:00:00"));
    expect(result).toMatch("5y - 1m - 15d");
  });

  it("should format date correctly", () => {
    const date = new Date("2020-01-02T18:00:00");
    const result = formatDate(date);
    expect(result).toBe("Jan 2, 2020");
  });
});
