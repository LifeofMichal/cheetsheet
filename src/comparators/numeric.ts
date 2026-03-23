import { isValidNumber } from "../utils/isValidNumber";

// comparator returns
// positive - a is greater than b; a AFTER b
// negative - a is less than b; a BEFORE b
// 0 -        a and b are equal; NO swap

function compareNumbers(a: unknown, b: unknown): number {
  const aValid = isValidNumber(a);
  const bValid = isValidNumber(b);

  // a case to handle pair of unexpected JS valid values like
  // for example:
  // Infinity, Infinity or -Infinity, -Infinity
  // that return NaN when added or subtracted
  if (a === b) return 0;

  // can return positive, negative, or 0
  if (aValid && bValid) return a - b;

  // only one is valid, the valid number should come first
  if (aValid) return -1; // place a first
  if (bValid) return 1; // place b first

  // both are invalid, returns 0 for no swap
  // also handles pairs like (NaN, null) or (undefined, "string")
  return 0;
}

// sorts numbers in ascending order with invalid values at the end
export function ascending(a: unknown, b: unknown): number {
  return compareNumbers(a, b);
}

// sorts numbers in descending order with invalid values at the beginning
export function descending(a: unknown, b: unknown): number {
  return compareNumbers(b, a);
}
