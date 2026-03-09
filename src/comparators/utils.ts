// returns true if value is a legtitimate number
// returns false for anything else
export function isValidNumber(val: any): val is number {
  return typeof val === "number" && !Number.isNaN(val);
}
