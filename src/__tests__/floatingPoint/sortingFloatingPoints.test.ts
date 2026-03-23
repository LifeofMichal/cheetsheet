import { describe, expect, it } from "vitest";
import {
  sortFloatingPoint,
  sortFloatingPointWithDynamicDecimal,
} from "../../floatingPoint/sortingFloatingPoint";
import { DECIMALS } from "../../constants/constants";

describe("sortFloatingPoint", () => {
  describe("should handle floating point and sort array", () => {
    it("and round values to 2 decimals by default", () => {
      const array = [
        1.1234,
        2.5678,
        3.3333,
        4.0001,
        1.1 + 0.0234, // 1.1234000000000002
        2.5 + 0.0678, // 2.5678000000000003
        3.3 + 0.0333, // 3.3333000000000004
        4.0001 + 0.0000001, // 4.000100100000001
        1.2345 + 0.00001, // 1.2345100000000001
        2.2222 + 0.00009, // 2.2222900000000003
        3.9999 - 0.00005, // 3.9998499999999997
      ];

      const sortedArray = [
        1.12, 1.12, 1.23, 2.22, 2.57, 2.57, 3.33, 3.33, 4, 4, 4,
      ];
      expect(sortFloatingPoint(array)).toEqual(sortedArray);
    });

    it("and handle negative values", () => {
      const array = [
        -0.1,
        -0.25,
        0,
        0.5,
        -0.3 + 0.1, // -0.19999999999999998
        -0.1 - 0.2, // -0.30000000000000004
        -0.5 + 0.4, // -0.09999999999999998
        0.1 + 0.2, // 0.30000000000000004
        0.7 - 0.6, // 0.09999999999999998
        0.2 + 0.4, // 0.6000000000000001
        -0.6 + 0.3, // -0.29999999999999993
      ];

      const sortedArray = [
        -0.3, -0.3, -0.25, -0.2, -0.1, -0.1, 0, 0.1, 0.3, 0.5, 0.6,
      ];
      expect(sortFloatingPoint(array)).toEqual(sortedArray);
    });

    it("and handle large numbers", () => {
      const array = [
        1000000.1,
        1000000.2,
        999999.9,
        1000000.1 + 0.2, // 1000000.3000000001
        999999.9 + 0.1, // 1000000
        1000000.3 - 0.2, // 1000000.0999999999
        1000000.5 - 0.4, // 1000000.0999999999
        999999.8 + 0.3, // 1000000.1
        1000000.2 + 0.1, // 1000000.3000000001
      ];

      const sortedArray = [
        999999.9, 1000000, 1000000.1, 1000000.1, 1000000.1, 1000000.1,
        1000000.2, 1000000.3, 1000000.3,
      ];
      expect(sortFloatingPoint(array)).toEqual(sortedArray);
    });

    it("and round values to custom 4 decimals", () => {
      const array = [
        1.1234,
        2.5678,
        3.3333,
        4.0001,
        1.1 + 0.0234, // 1.1234000000000002
        2.5 + 0.0678, // 2.5678000000000003
        3.3 + 0.0333, // 3.3333000000000004
        4.0001 + 0.0000001, // 4.000100100000001
        1.2345 + 0.00001, // 1.2345100000000001
        2.2222 + 0.00009, // 2.2222900000000003
        3.9999 - 0.00005, // 3.9998499999999997
      ];

      const sortedArray = [
        1.1234, 1.1234, 1.2345, 2.2223, 2.5678, 2.5678, 3.3333, 3.3333, 3.9999,
        4.0001, 4.0001,
      ];
      expect(sortFloatingPoint(array, 4)).toEqual(sortedArray);
    });

    it("and round values to the max 6 decomals", () => {
      const array = [
        0.123456,
        0.654321,
        0.111111,
        0.999999,
        0.123456 + 0.0000001, // 0.12345610000000001
        0.654321 + 0.0000009, // 0.6543219000000001
        0.111111 + 0.0000004, // 0.11111140000000001
        0.999999 + 0.0000003, // 0.9999993000000001
        0.1 + 0.123456789, // 0.22345678900000002
        0.222222 + 0.0000007, // 0.22222270000000002
        0.333333 + 0.0000008, // 0.33333380000000003
      ];

      const sortedArray = [
        0.111111, 0.111111, 0.123456, 0.123456, 0.222223, 0.223457, 0.333334,
        0.654321, 0.654322, 0.999999, 0.999999,
      ];
      expect(sortFloatingPoint(array, DECIMALS.MAX)).toEqual(sortedArray);
    });
  });
});

describe("sortFloatingPointWithDynamicDecimals", () => {
  describe("should handle floating point and sort array", () => {
    it("and round values to the biggest found decimal or MAX DECIMAL", () => {
      const array = [
        0.1,
        0.12,
        0.123,
        0.1234,
        0.1 + 0.2, // 0.30000000000000004 (17 decimals)
        0.12 + 0.0034, // 0.12340000000000001
        0.123 + 0.0004, // 0.12340000000000001
        0.1234 + 0.00005, // 0.12345000000000001
        0.5 - 0.4, // 0.09999999999999998
        0.3 - 0.1, // 0.19999999999999998
        0.2 + 0.4, // 0.6000000000000001
      ];

      const sortedArray = [
        0.1, 0.1, 0.12, 0.123, 0.1234, 0.1234, 0.1234, 0.12345, 0.2, 0.3, 0.6,
      ];

      expect(sortFloatingPointWithDynamicDecimal(array)).toEqual(sortedArray);
    });
  });
});
