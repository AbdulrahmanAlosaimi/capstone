/**
 * @jest-environment jsdom
 */

import { getPixabayObject } from "../src/client/js/pixabayAPI";

describe("Testing the submit functionality", () => {
    test("Testing the getPixabayObject() function", () => {
        expect(getPixabayObject).toBeDefined();
    })
})