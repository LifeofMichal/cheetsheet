import { isValidNumber } from "./isValidNumber";

export function getNumberOfDecimals(num: number): number {
  if (!isValidNumber(num)) return 0;
  if (!Number.isFinite(num)) return 0;
  if (Number.isInteger(num)) return 0;

  return num.toString().split(".")[1].length;
}
