import { describe, it, expect } from "vitest";
import { quicksort } from "../../quicksort";
import { descending } from "../../comparators/numeric";
import { ascendingInvalidFirst } from "../../comparators/ascendingInvalidFirst";
import { descendingInvalidLast } from "../../comparators/descendingInvalidLast";

describe("quicksort", () => {
  describe("short sort array of numbers in order of", () => {
    it("ascending", () => {
      const array = [5, 7.3, 7, 3.1, -20, 0, 40];
      quicksort(array, 0, array.length - 1);
      expect(array).toEqual([-20, 0, 3.1, 5, 7, 7.3, 40]);
    });

    it("ascending with non-numeric values at the end", () => {
      const array = [5, "MOO", 7.3, null, 7, 3.1, -20, 0, undefined, 40];
      quicksort(array, 0, array.length - 1);

      const sortedValidNumericValues = array.slice(0, 7);
      const lastInvalidValued = array.slice(7);

      expect(sortedValidNumericValues).toEqual([-20, 0, 3.1, 5, 7, 7.3, 40]);
      expect(lastInvalidValued).toContain("MOO");
      expect(lastInvalidValued).toContain(null);
      expect(lastInvalidValued).toContain(undefined);
    });

    it("ascending with non-numeric values at the start", () => {
      const array = [5, "MOO", 7.3, null, 7, 3.1, -20, 0, undefined, 40];
      quicksort(array, 0, array.length - 1, ascendingInvalidFirst);

      const firstInvalidValued = array.slice(0, 3);
      const sortedValidNumericValues = array.slice(3);

      expect(firstInvalidValued).toContain("MOO");
      expect(firstInvalidValued).toContain(null);
      expect(firstInvalidValued).toContain(undefined);
      expect(sortedValidNumericValues).toEqual([-20, 0, 3.1, 5, 7, 7.3, 40]);
    });

    it("descending", () => {
      const array = [5, 7.3, 7, 3.1, -20, 0, 40];
      quicksort(array, 0, array.length - 1, descending);
      expect(array).toEqual([40, 7.3, 7, 5, 3.1, 0, -20]);
    });

    it("descending with non-numeric values at the start", () => {
      const array = [5, "MOO", 7.3, null, 7, 3.1, -20, 0, undefined, 40];
      quicksort(array, 0, array.length - 1, descending);

      const firstInvalidValued = array.slice(0, 3);
      const sortedValidNumericValues = array.slice(3);

      expect(firstInvalidValued).toContain("MOO");
      expect(firstInvalidValued).toContain(null);
      expect(firstInvalidValued).toContain(undefined);
      expect(sortedValidNumericValues).toEqual([40, 7.3, 7, 5, 3.1, 0, -20]);
    });

    it("descending with non-numeric values at the end", () => {
      const array = [5, "MOO", 7.3, null, 7, 3.1, -20, 0, undefined, 40];
      quicksort(array, 0, array.length - 1, descendingInvalidLast);

      const sortedValidNumericValues = array.slice(0, 7);
      const lastInvalidValued = array.slice(7);

      expect(sortedValidNumericValues).toEqual([40, 7.3, 7, 5, 3.1, 0, -20]);
      expect(lastInvalidValued).toContain("MOO");
      expect(lastInvalidValued).toContain(null);
      expect(lastInvalidValued).toContain(undefined);
    });
  });
});
