import { isValidNumber } from "./utils";

// sorts numbers in descending order with invalid values at the end
export function descendingInvalidLast(a: unknown, b: unknown): number {
  const aValid = isValidNumber(a);
  const bValid = isValidNumber(b);

  if (a === b) return 0;

  if (!aValid && !bValid) return 0;

  // always place invalid values at the later spot
  if (!aValid && bValid) return 1;
  if (aValid && !bValid) return -1;
  if (aValid && bValid) return b - a;

  return 0;
}
