import { dayDiff } from '../src/server/weatherBitSS.js';

describe("Checks if the days that two dates are apart are valid", () => {
    test("Should return true as the dates should be 2 days apart", () => {

        const date1 = new Date(2020, 0, 1)
        const date2 = new Date(2020, 0, 3)
        const result = 2;
        expect(dayDiff(date2,date1)).toBe(result);
    });
});

describe("Checks if the days that two dates are apart are valid", () => {
    test("Should return ture as the days are the same and should be zero days apart", () => {

        const date1 = new Date(2020, 0, 1)
        const date2 = new Date(2020, 0, 1)
        const result = 0;
        expect(dayDiff(date2,date1)).toBe(result);
    });
});