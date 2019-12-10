"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_json_1 = __importDefault(require("./input.json"));
// Step 2
const calculateFuleRequired = (mass, totalFuelRequired = 0) => {
    const fuelRequired = Math.floor(mass / 3) - 2;
    if (fuelRequired < 0) {
        return totalFuelRequired;
    }
    totalFuelRequired += fuelRequired;
    return calculateFuleRequired(fuelRequired, totalFuelRequired);
};
(() => {
    const totalFuelNeeded = input_json_1.default.reduce((prev, next) => {
        return prev + calculateFuleRequired(next);
    }, 0);
    console.log('Total Fuel Needed: ', totalFuelNeeded);
})();
// Step 1
// const calculateFuleRequired = (mass: number): number => {
//   return Math.floor(mass / 3) - 2;
// };
// (() => {
//   const totalFuelNeeded = input.reduce((prev: number, next: number) => {
//     return prev + calculateFuleRequired(next);
//   }, 0);
//   console.log('Total Fuel Needed: ', totalFuelNeeded);
// })();
//# sourceMappingURL=index.js.map