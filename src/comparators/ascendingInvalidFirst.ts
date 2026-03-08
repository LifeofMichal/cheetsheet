import { isValidNumber } from "./utils";

// sorts numbers in ascending order with invalid values at the start
export function ascendingInvalidFirst(a: unknown, b: unknown): number {
  const aValid = isValidNumber(a);
  const bValid = isValidNumber(b);

  if (a === b) return 0;

  if (!aValid && !bValid) return 0;

  // always place invalid value at the first spot
  if (!aValid && bValid) return -1;
  if (aValid && !bValid) return 1;

  if (aValid && bValid) return a - b;

  return 0;
}
