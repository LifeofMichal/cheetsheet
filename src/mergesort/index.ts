const array = [5, "MOO", 7.3, null, 7, 3.1, -20, 0, undefined, 40];

export function mergesort<T>(array: T[]) {
  if (array.length === 1) return;

  mergesort(array);
  mergesort(array);
}
