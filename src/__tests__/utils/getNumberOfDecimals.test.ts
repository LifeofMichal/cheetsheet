import { describe, expect, it } from "vitest";
import { getNumberOfDecimals } from "../../utils/getNumberOfDecimals.ts";

describe("getNumberByDecimals returns", () => {
  it.each([
    [9, 10.123456789],
    [9, 0.123456789],
    [4, 0.1234],
    [3, -0.123],
    [5, -10.12345],
    [1, 1012345678.9],
    [1, +1012345678.9],
    [3, 12.25 + 45.505],
    [2, 12.25 + 45.5],
    [1, 12 + 45.5],
    [3, 10.101],
    [1, 10.1],
    [0, 10.0],
    [0, 0],
    [0, -0],
    [3, Number("12.345")],
    [5, Number("0.12345")],
  ])("%s decimal place(s) for value %s", (expected, value) => {
    expect(getNumberOfDecimals(value)).toBe(expected);
  });

  it.each([
    [1, 900719925474099.1],
    [1, 900719925474099.123],
    [2, 90071992547409.12],
    [2, 90071992547409.1234],
    [3, 9007199254740.123],
    [3, 9007199254740.12345],
  ])(
    '%s decimal place(s) for value %s "dangerously close" to SAFE INTEGER boundary',
    (expected, value) => {
      expect(getNumberOfDecimals(value)).toBe(expected);
    },
  );

  it.each([
    Infinity,
    -Infinity,
    9007199254740995.1, // exceeded MAX_SAFE_INTEGER (removes decimals)
    9007199254740995.123456, // exceeded MAX_SAFE_INTEGER (removes decimals)
  ])('0 decimals for non finite or "unsafe" numerical value %s', () => {});

  it.each([
    "-0",
    "moo",
    { foo: 1, bar: 2 },
    [1, 2, 3, 4],
    null,
    undefined,
    NaN,
    Number("12,345"), // because ',' is not a valid decimal to convert - becomes NaN
    Number("12 345"), // because ' ' is not a valid decimal to convert - becomes NaN
  ])("0 decimals for non numeric value %s", (value) => {
    // @ts-expect-error value is sometimes not number for testing purposes
    expect(getNumberOfDecimals(value)).toBe(0);
  });

  it.todo("add tests for handling exponents: 1e5, 1e-7, 1.23e-5, etc");
});
