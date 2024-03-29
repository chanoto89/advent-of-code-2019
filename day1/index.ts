import input from './input.json';

// Step 2
const calculateFuleRequired = (mass: number, totalFuelRequired = 0): number => {
  const fuelRequired = Math.floor(mass / 3) - 2;

  if (fuelRequired < 0) {
    return totalFuelRequired;
  }

  totalFuelRequired += fuelRequired;
  return calculateFuleRequired(fuelRequired, totalFuelRequired);
};

(() => {
  const totalFuelNeeded = input.reduce((prev: number, next: number) => {
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
