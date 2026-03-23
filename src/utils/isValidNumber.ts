// returns true if value is a legtitimate number
// returns false for anything else
// returns true for Infinity && -Infinity as those are technically numbers
export function isValidNumber(val: any): val is number {
  return typeof val === "number" && !Number.isNaN(val);
}
