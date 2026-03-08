import { isValidNumber } from "./utils";

function comparator(a: unknown, b: unknown): number {
  const aValid = isValidNumber(a);
  const bValid = isValidNumber(b);

  // can return positive, negative, or 0
  if (aValid && bValid) return a - b;

  // b is invalid, return negative to sort a first
  if (aValid) return -1;

  // a is invalid, return positive to sort b first
  if (bValid) return 1;

  // both are invalid, returns 0 for no swap
  return 0;
}

// sorts numbers in ascending order with invalid values at the end
export function ascending(a: unknown, b: unknown): number {
  return comparator(a, b);
}

// sorts numbers in descending order with invalid values at the beginning
export function descending(a: unknown, b: unknown): number {
  return comparator(b, a);
}
