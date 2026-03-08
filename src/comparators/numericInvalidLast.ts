import { isValidNumber } from "./utils";

// sorts numbers in ascending order with invalid values at the end
export function ascendingInvalidLast(a: unknown, b: unknown): number {
  const aValid = isValidNumber(a);
  const bValid = isValidNumber(b);

  if (!aValid && bValid) return 1;
  if (aValid && !bValid) return -1;
  if (!aValid && !bValid) return 0;

  if (aValid && bValid) return a - b;

  return 0;
}

// sorts numbers in descending order with invalid values at the end
export function descendingInvalidLast(a: unknown, b: unknown): number {
  const aValid = isValidNumber(a);
  const bValid = isValidNumber(b);

  if (!aValid && bValid) return 1;
  if (aValid && !bValid) return -1;
  if (!aValid && !bValid) return 0;

  if (aValid && bValid) return b - a;

  return 0;
}
