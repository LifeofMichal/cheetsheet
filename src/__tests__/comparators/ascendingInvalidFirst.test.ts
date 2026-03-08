import { describe, it, expect } from "vitest";
import { ascendingInvalidFirst } from "../../comparators/ascendingInvalidFirst";

describe("ascendingInvalidFirst", () => {
  it("returns negative when first number is smaller than second", () => {
    expect(ascendingInvalidFirst(1, 2)).toBeLessThan(0);
  });

  it("returns positive when first number is larger than second", () => {
    expect(ascendingInvalidFirst(2, 1)).toBeGreaterThan(0);
  });

  it("places invalid value before valid number when invalid is first argument", () => {
    expect(ascendingInvalidFirst(undefined, 1)).toBeLessThan(0);
  });

  it("places invalid value before valid number when invalid is second argument", () => {
    expect(ascendingInvalidFirst(1, undefined)).toBeGreaterThan(0);
  });

  // Generic comparator rules
  it("returns 0 when both numbers are equal", () => {
    expect(ascendingInvalidFirst(2, 2)).toBe(0);
  });

  it("treats two invalid values as equal", () => {
    expect(ascendingInvalidFirst(undefined, NaN)).toBe(0);
    expect(ascendingInvalidFirst(NaN, "string")).toBe(0);
    expect(ascendingInvalidFirst("string", { foo: 1, bar: 2 })).toBe(0);
  });

  it("correctly compares negative numbers", () => {
    expect(ascendingInvalidFirst(-1, -3)).toBeGreaterThan(0);
    expect(ascendingInvalidFirst(-3, -1)).toBeLessThan(0);
  });

  it("correctly compares zero and positive numbers", () => {
    expect(ascendingInvalidFirst(0, 2)).toBeLessThan(0);
    expect(ascendingInvalidFirst(2, 0)).toBeGreaterThan(0);
  });

  it("correctly compares zero and negative numbers", () => {
    expect(ascendingInvalidFirst(0, -2)).toBeGreaterThan(0);
    expect(ascendingInvalidFirst(-2, 0)).toBeLessThan(0);
  });

  it("correctly compares Infinity values", () => {
    expect(ascendingInvalidFirst(2, Infinity)).toBeLessThan(0);
    expect(ascendingInvalidFirst(Infinity, 2)).toBeGreaterThan(0);
    expect(ascendingInvalidFirst(Infinity, Infinity)).toBe(0);

    expect(ascendingInvalidFirst(2, -Infinity)).toBeGreaterThan(0);
    expect(ascendingInvalidFirst(-Infinity, 2)).toBeLessThan(0);
    expect(ascendingInvalidFirst(-Infinity, -Infinity)).toBe(0);
  });
});
