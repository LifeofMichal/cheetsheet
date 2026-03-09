import { describe, it, expect } from "vitest";
import {
  firstPivot,
  lastPivot,
  middlePivot,
  medianOfThreePivot,
} from "../../quicksort/pivotFinder";

function randomArrayOfLength(length: number) {
  return Array.from({ length }, () => Math.random());
}

const mockComparator = (a: any, b: any) => a - b;

describe("firstPivot", () => {
  it.each([
    { array: randomArrayOfLength(1), length: 1 },
    { array: randomArrayOfLength(8), length: 8 },
    { array: randomArrayOfLength(0), length: 0 },
    { array: randomArrayOfLength(17), length: 17 },
  ])("should return 0 for array length $length", ({ array, length }) => {
    expect(firstPivot(array, 0, length - 1, mockComparator)).toBe(0);
  });
});

describe("lastPivot", () => {
  it.each([
    { array: randomArrayOfLength(1), length: 1 },
    { array: randomArrayOfLength(8), length: 8 },
    { array: randomArrayOfLength(0), length: 0 },
    { array: randomArrayOfLength(17), length: 17 },
  ])(
    "should return last-index value of the array length $length",
    ({ array, length }) => {
      expect(lastPivot(array, 0, length - 1, mockComparator)).toBe(length - 1);
    },
  );
});

describe("middlePivot", () => {
  it.each([
    { array: randomArrayOfLength(1), length: 1 },
    { array: randomArrayOfLength(8), length: 8 },
    { array: randomArrayOfLength(0), length: 0 },
    { array: randomArrayOfLength(17), length: 17 },
  ])(
    `should return middle index of the array of length $length`,
    ({ array, length }) => {
      const expectedIndex = Math.floor((length - 1) / 2);
      expect(middlePivot(array, 0, length - 1, mockComparator)).toBe(
        expectedIndex,
      );
    },
  );
});

describe("medianOfThreePivot", () => {
  it("should return the index of the median value among the first, middle, and last elements", () => {
    const array = [3, 1, 2, 7, 9, 16, 19, 45];
    expect(medianOfThreePivot(array, 0, array.length - 1, mockComparator)).toBe(
      3,
    );
    expect(array[3]).toBe(7);
  });
});

it("should throw an error if comparator is not provided", () => {
  const array = [3, 1, 2];
  expect(() =>
    // @ts-expect-error - undefined should be a comparator function
    medianOfThreePivot(array, 0, array.length - 1, undefined),
  ).toThrow("Comparator required for medianOfThree pivot");
});
