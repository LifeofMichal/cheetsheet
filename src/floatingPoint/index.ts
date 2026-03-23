import { quicksort } from "../quicksort";
import { descending } from "../comparators/numeric";
import { getNumberOfDecimalsByString } from "../utils/getNumberOfDecimals";

const array = [
  0.1,
  0.1 + 0.11,
  0.3 - 0.1,
  0.2,
  0.3 + 0.1,
  0.4 - 0.1,
  0.3,
  0.1 + 0.2,
];

const DECIMAL_SCALE = 100;
const roundedToScale = array.map((x) => Math.round(x * DECIMAL_SCALE));

const maxDecimals = Math.max(...array.map(getNumberOfDecimalsByString));
const decimalMultiplier = 10 ** Math.min(maxDecimals, 10); // if maxDecimals === 3 -> 10 ** maxDecimals === 10³

console.log({ decimalScale: DECIMAL_SCALE });

console.log({ array });
console.log({ roundedToScale });

quicksort(roundedToScale, 0, roundedToScale.length - 1);
console.log({ sorted: roundedToScale });
const divideedByScale = roundedToScale.map((x) => x / DECIMAL_SCALE);

console.log({ divideedByScale });
