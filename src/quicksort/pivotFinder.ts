export type PivotFinder<T> = (
  array: T[],
  left: number,
  right: number,
  comparator: (a: T, b: T) => number,
) => number;

export const firstPivot: PivotFinder<any> = () => 0;

export const lastPivot: PivotFinder<any> = (_array, _left, right) => right;

export const middlePivot: PivotFinder<any> = (_array, left, right) => {
  return Math.floor((left + right) / 2);
};

export const medianOfThreePivot: PivotFinder<any> = (
  array,
  left,
  right,
  comparator,
) => {
  const mid = Math.floor((left + right) / 2);
  const candidates = [
    { value: array[left], index: left },
    { value: array[mid], index: mid },
    { value: array[right], index: right },
  ];

  if (!comparator) {
    throw new Error("Comparator required for medianOfThree pivot");
  }

  candidates.sort((a, b) => comparator(a.value, b.value));

  return candidates[1].index;
};
