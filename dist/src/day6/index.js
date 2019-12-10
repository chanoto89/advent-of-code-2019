"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_json_1 = __importDefault(require("./input.json"));
// const input = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L'];
const orbitKeys = input_json_1.default.reduce((prev, curr) => {
    const [orbitObj, obj] = curr.split(')');
    prev[obj] = orbitObj;
    return prev;
}, {});
let totalOrbits = 0;
for (let key in orbitKeys) {
    let parentOrbit = orbitKeys[key];
    while (parentOrbit) {
        totalOrbits++;
        parentOrbit = orbitKeys[parentOrbit];
    }
}
console.log('Total Orbits: ', totalOrbits);
//# sourceMappingURL=index.js.map