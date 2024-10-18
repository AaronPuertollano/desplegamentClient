import {test} from "node:test";
import assert from "node:assert";
import cash from "./cash.js";

test('cash', () => {
    assert.deepEqual(cash(19.5, 20, 
        [["PENNY", 1.01],
        ["NICKEL", 2.05],
        ["DIME", 3.1],
        ["QUARTER", 4.25],
        ["ONE", 90],
        ["FIVE", 55],
        ["TEN", 20],
        ["TWENTY", 60],
        ["ONE HUNDRED", 100]
    ]),
        {status: "OPEN", change: [["QUARTER", 0.5]]}
    );
});