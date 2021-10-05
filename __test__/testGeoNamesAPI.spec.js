/**
 * @jest-environment jsdom
 */

import { getGeoNamesObject } from "../src/client/js/geoNamesAPI";

describe("Testing the submit functionality", () => {
    test("Testing the getGeoNamesObject() function", () => {
        expect(getGeoNamesObject).toBeDefined();
    })
})