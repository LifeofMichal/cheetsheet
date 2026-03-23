import { quicksort } from "../quicksort";
import { getNumberOfDecimals } from "../utils/getNumberOfDecimals";
import { type MaxSixDecimals } from "../types/numberRange";
import { DECIMALS } from "../constants/constants";

function sortFloatingPoint(
  array: number[],
  decimals: MaxSixDecimals = DECIMALS.DEFAULT,
): number[] {
  // when decimals === 3 then 10 ** 3 === 10³
  const DECIMAL_SCALE = 10 ** decimals;

  const roundedToScale = array.map((x) => Math.round(x * DECIMAL_SCALE));
  quicksort(roundedToScale, 0, roundedToScale.length - 1);
  const dividedByDecimalScale = roundedToScale.map((x) => x / DECIMAL_SCALE);

  return dividedByDecimalScale;
}

function sortFloatingPointWithDynamicDecimal(array: number[]) {
  const dynamicDecimalsFromArray = Math.max(...array.map(getNumberOfDecimals));

  const dynamicDecimnal = Math.min(
    dynamicDecimalsFromArray,
    DECIMALS.MAX,
  ) as MaxSixDecimals;

  return sortFloatingPoint(array, dynamicDecimnal);
}

export { sortFloatingPoint, sortFloatingPointWithDynamicDecimal };
