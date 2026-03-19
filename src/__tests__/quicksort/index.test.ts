import { describe, it, expect } from "vitest";
import { quicksort } from "../../quicksort";
import { descending } from "../../comparators/numeric";
import { ascendingInvalidFirst } from "../../comparators/ascendingInvalidFirst";
import { descendingInvalidLast } from "../../comparators/descendingInvalidLast";

describe("quicksort", () => {
  describe("should sort array of numbers in order of", () => {
    describe("ascending", () => {
      it("by default", () => {
        const array = [5, 7.3, 7, 3.1, -20, 0, 40];
        quicksort(array, 0, array.length - 1);
        expect(array).toEqual([-20, 0, 3.1, 5, 7, 7.3, 40]);
      });

      it("with floating point value", () => {
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
        quicksort(array, 0, array.length - 1);
        expect(array).toEqual([
          0.1, // 0.1
          0.19999999999999998, // 0.3 - 0.1
          0.2, // 0.2
          0.21000000000000002, // 0.1 + 0.11
          0.3, // 0.3
          0.30000000000000004, // 0.1 + 0.2
          0.30000000000000004, // 0.4 - 0.1
          0.4, // 0.3 + 0.1
        ]);
      });

      it("with non-numeric values at the end", () => {
        const array = [5, "MOO", 7.3, null, 7, 3.1, -20, 0, undefined, 40];
        quicksort(array, 0, array.length - 1);

        const sortedValidNumericValues = array.slice(0, 7);
        const lastInvalidValued = array.slice(7);

        expect(sortedValidNumericValues).toEqual([-20, 0, 3.1, 5, 7, 7.3, 40]);
        expect(lastInvalidValued).toContain("MOO");
        expect(lastInvalidValued).toContain(null);
        expect(lastInvalidValued).toContain(undefined);
      });

      it("with non-numeric values at the start", () => {
        const array = [5, "MOO", 7.3, null, 7, 3.1, -20, 0, undefined, 40];
        quicksort(array, 0, array.length - 1, ascendingInvalidFirst);

        const firstInvalidValued = array.slice(0, 3);
        const sortedValidNumericValues = array.slice(3);

        expect(firstInvalidValued).toContain("MOO");
        expect(firstInvalidValued).toContain(null);
        expect(firstInvalidValued).toContain(undefined);
        expect(sortedValidNumericValues).toEqual([-20, 0, 3.1, 5, 7, 7.3, 40]);
      });
    });

    describe("descending", () => {
      it("by default", () => {
        const array = [5, 7.3, 7, 3.1, -20, 0, 40];
        quicksort(array, 0, array.length - 1, descending);
        expect(array).toEqual([40, 7.3, 7, 5, 3.1, 0, -20]);
      });

      it("with floating point value", () => {
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
        quicksort(array, 0, array.length - 1, descending);
        expect(array).toEqual([
          0.4, // 0.3 + 0.1
          0.30000000000000004, // 0.4 - 0.1
          0.30000000000000004, // 0.1 + 0.2
          0.3, // 0.3
          0.21000000000000002, // 0.1 + 0.11
          0.2, // 0.2
          0.19999999999999998, // 0.3 - 0.1
          0.1, // 0.1
        ]);
      });

      it("with non-numeric values at the start", () => {
        const array = [5, "MOO", 7.3, null, 7, 3.1, -20, 0, undefined, 40];
        quicksort(array, 0, array.length - 1, descending);

        const firstInvalidValued = array.slice(0, 3);
        const sortedValidNumericValues = array.slice(3);

        expect(firstInvalidValued).toContain("MOO");
        expect(firstInvalidValued).toContain(null);
        expect(firstInvalidValued).toContain(undefined);
        expect(sortedValidNumericValues).toEqual([40, 7.3, 7, 5, 3.1, 0, -20]);
      });

      it("with non-numeric values at the end", () => {
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
});
