import { describe, it, expect } from "vitest";
import { descendingInvalidLast } from "../../comparators/descendingInvalidLast";

describe("descendingInvalidLast", () => {
  it("returns positive when first number is smaller than second", () => {
    expect(descendingInvalidLast(1, 2)).toBeGreaterThan(0);
  });

  it("returns negative when first number is larger than second", () => {
    expect(descendingInvalidLast(2, 1)).toBeLessThan(0);
  });

  it("places valid number before invalid value when valid is first argument", () => {
    expect(descendingInvalidLast(1, undefined)).toBeLessThan(0);
  });

  it("places valid number before invalid value when valid is second argument", () => {
    expect(descendingInvalidLast(undefined, 1)).toBeGreaterThan(0);
  });

  // Generic comparator rules
  it("returns 0 when both numbers are equal", () => {
    expect(descendingInvalidLast(2, 2)).toBe(0);
  });

  it("treats two invalid values as equal", () => {
    expect(descendingInvalidLast(undefined, NaN)).toBe(0);
    expect(descendingInvalidLast(NaN, "string")).toBe(0);
    expect(descendingInvalidLast("string", { foo: 1, bar: 2 })).toBe(0);
  });

  it("correctly compares negative numbers", () => {
    expect(descendingInvalidLast(-1, -3)).toBeLessThan(0);
    expect(descendingInvalidLast(-3, -1)).toBeGreaterThan(0);
  });

  it("correctly compares zero and positive numbers", () => {
    expect(descendingInvalidLast(0, 2)).toBeGreaterThan(0);
    expect(descendingInvalidLast(2, 0)).toBeLessThan(0);
  });

  it("correctly compares zero and negative numbers", () => {
    expect(descendingInvalidLast(0, -2)).toBeLessThan(0);
    expect(descendingInvalidLast(-2, 0)).toBeGreaterThan(0);
  });

  it("correctly compares Infinity values", () => {
    expect(descendingInvalidLast(2, Infinity)).toBeGreaterThan(0);
    expect(descendingInvalidLast(Infinity, 2)).toBeLessThan(0);
    expect(descendingInvalidLast(Infinity, Infinity)).toBe(0);

    expect(descendingInvalidLast(2, -Infinity)).toBeLessThan(0);
    expect(descendingInvalidLast(-Infinity, 2)).toBeGreaterThan(0);
    expect(descendingInvalidLast(-Infinity, -Infinity)).toBe(0);
  });
});
