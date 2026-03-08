import { describe, it, expect, expectTypeOf } from "vitest";
import { isValidNumber } from "../../comparators/utils";

describe("isValidNumber", () => {
  const VALID_NUMBERS = [-Infinity, -1337, -420, -0, 0, 13, 42, 54, Infinity];
  const INVALID_VALUES = [
    [],
    [0, 1, 2, 3],
    { foo: 1, bar: 2 },
    "13",
    false,
    true,
    NaN,
    null,
    undefined,
    10n, // bigint
  ];

  it.each(VALID_NUMBERS)("returns true for %s", (val) => {
    expect(isValidNumber(val)).toBe(true);
  });

  it.each(INVALID_VALUES)("returns false for %s", (val) => {
    expect(isValidNumber(val)).toBe(false);
  });

  // NOTE:
  // This test verifies TypeScript type narrowing, not runtime assertions.
  // `expectTypeOf` checks are erased at runtime, so the test passes regardless.
  // If the type guard breaks, TypeScript will emit errors in these assertions.
  it.each([...VALID_NUMBERS, ...INVALID_VALUES])(
    "returns properly validate type for %s",
    (val) => {
      const value: unknown = val;
      if (isValidNumber(value)) {
        expectTypeOf(value).toEqualTypeOf<number>();
      } else {
        expectTypeOf(value).toEqualTypeOf<unknown>();
      }
    },
  );
});
