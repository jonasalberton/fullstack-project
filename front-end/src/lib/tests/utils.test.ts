import clsx from "clsx";
import { describe, it, expect } from "vitest";

describe("Utils Package", () => {
  it("should merge tailwind classes", () => {
    expect(clsx(["bg-red-500", ["text-white"]])).toBe("bg-red-500 text-white");
  });
});
