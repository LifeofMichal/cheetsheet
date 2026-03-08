import { middlePivot, type PivotFinder } from "./pivotFinder.ts";
import { ascending } from "../comparators/numeric.ts";
import {
  ascendingInvalidLast,
  descendingInvalidLast,
} from "../comparators/numericInvalidLast.ts";

const RANDOM_NUMBER_LIST_OF_LENGTH_10: unknown[] = [
  1,
  "shazam",
  5,
  2,
  undefined,
  7.3,
  7,
  3.1,
  8,
  [],
  null,
  6,
  3,
  -20,
  0,
  40,
  4,
  9,
  { foo: 1, bar: 2 },
  [4, 5, 6, 4],
];

export function quicksort<T>(
  array: T[],
  left: number,
  right: number,
  comparator: (a: T, b: T) => number = ascending,
  pivotFinder: PivotFinder<T> = middlePivot,
) {
  // exit conidion
  if (left >= right) return;

  const pivot = pivotFinder(array, left, right, comparator);

  // swap pivot with last value
  [array[pivot], array[right]] = [array[right], array[pivot]];

  let i = left;
  const pivotValue = array[right];

  for (let j = left; j < right; j++) {
    // if comparator value is lower than 0 swap current evaliated value with i of the "left region"
    if (comparator(array[j], pivotValue) < 0) {
      [array[i], array[j]] = [array[j], array[i]];
      i++;
    }
  }

  // move pivot back from last valie
  [array[i], array[right]] = [array[right], array[i]];

  // call function recursively on the remaining regions of the array
  quicksort(array, left, i - 1, comparator, pivotFinder);
  quicksort(array, i + 1, right, comparator, pivotFinder);
}

quicksort(
  RANDOM_NUMBER_LIST_OF_LENGTH_10,
  0,
  RANDOM_NUMBER_LIST_OF_LENGTH_10.length - 1,
  descendingInvalidLast,
);

console.log({
  sortedList: RANDOM_NUMBER_LIST_OF_LENGTH_10,
});
