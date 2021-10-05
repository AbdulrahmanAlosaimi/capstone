/**
 * @jest-environment jsdom
 */

import { getWeatherbitObject } from "../src/client/js/weatherbitAPI";

describe("Testing the submit functionality", () => {
    test("Testing the getWeatherbitObject() function", () => {
        expect(getWeatherbitObject).toBeDefined();
    })
})