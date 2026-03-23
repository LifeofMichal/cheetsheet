type BuildRange<
  N extends number,
  Result extends number[] = [],
> = Result["length"] extends N
  ? Result[number]
  : BuildRange<N, [...Result, Result["length"]]>;

type Range<From extends number, To extends number> =
  | Exclude<BuildRange<To>, BuildRange<From>>
  | From;

export type MaxSixDecimals = Range<0, 7>;

// WIP
// type EnsureMaxSixDecimals<T extends number> = T extends MaxSixDecimals
//   ? T
//   : ["Value must be between 0 and 6"];
