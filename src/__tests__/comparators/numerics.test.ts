import { describe, it, expect } from "vitest";
import { ascending, descending } from "../../comparators/numeric";

describe("compareNumbers", () => {
  describe("ascending", () => {
    it("returns negative when first number is smaller than second", () => {
      expect(ascending(1, 2)).toBeLessThan(0);
    });

    it("returns positive when first number is larger than second", () => {
      expect(ascending(2, 1)).toBeGreaterThan(0);
    });

    it("places valid number before invalid value when valid is first argument", () => {
      expect(ascending(undefined, 1)).toBeGreaterThan(0);
    });

    it("places valid number before invalid value when valid is second argument", () => {
      expect(ascending(1, undefined)).toBeLessThan(0);
    });
  });

  describe("descending", () => {
    it("returns positive when first number is smaller than second", () => {
      expect(descending(1, 2)).toBeGreaterThan(0);
    });

    it("returns negative when first number is larger than second", () => {
      expect(descending(2, 1)).toBeLessThan(0);
    });

    it("places valid number after invalid value when valid is first argument", () => {
      expect(descending(undefined, 1)).toBeLessThan(0);
    });

    it("places valid number after invalid value when valid is second argument", () => {
      expect(descending(1, undefined)).toBeGreaterThan(0);
    });
  });

  // Generic comparator rules
  it("returns 0 when both numbers are equal", () => {
    expect(ascending(2, 2)).toBe(0);
    expect(descending(2, 2)).toBe(0);
  });

  it("treats two invalid values as equal", () => {
    expect(ascending(undefined, NaN)).toBe(0);
    expect(ascending(NaN, "string")).toBe(0);
    expect(ascending("string", { foo: 1, bar: 2 })).toBe(0);

    expect(descending({ foo: 1, bar: 2 }, [])).toBe(0);
    expect(descending([], false)).toBe(0);
    expect(descending(false, 10n)).toBe(0);
  });

  it("correctly compares negative numbers", () => {
    expect(ascending(-1, -3)).toBeGreaterThan(0);
    expect(ascending(-3, -1)).toBeLessThan(0);

    expect(descending(-1, -3)).toBeLessThan(0);
    expect(descending(-3, -1)).toBeGreaterThan(0);
  });

  it("correctly compares zero and positive numbers", () => {
    expect(ascending(0, 2)).toBeLessThan(0);
    expect(ascending(2, 0)).toBeGreaterThan(0);

    expect(descending(0, 2)).toBeGreaterThan(0);
    expect(descending(2, 0)).toBeLessThan(0);
  });

  it("correctly compares zero and negative numbers", () => {
    expect(ascending(0, -2)).toBeGreaterThan(0);
    expect(ascending(-2, 0)).toBeLessThan(0);

    expect(descending(0, -2)).toBeLessThan(0);
    expect(descending(-2, 0)).toBeGreaterThan(0);
  });

  it("correctly compares Infinity values", () => {
    expect(ascending(2, Infinity)).toBeLessThan(0);
    expect(ascending(Infinity, 2)).toBeGreaterThan(0);
    expect(ascending(Infinity, Infinity)).toBe(0);

    expect(ascending(2, -Infinity)).toBeGreaterThan(0);
    expect(ascending(-Infinity, 2)).toBeLessThan(0);
    expect(ascending(-Infinity, -Infinity)).toBe(0);

    expect(descending(2, Infinity)).toBeGreaterThan(0);
    expect(descending(Infinity, 2)).toBeLessThan(0);
    expect(descending(Infinity, Infinity)).toBe(0);

    expect(descending(2, -Infinity)).toBeLessThan(0);
    expect(descending(-Infinity, 2)).toBeGreaterThan(0);
    expect(descending(-Infinity, -Infinity)).toBe(0);
  });
});
