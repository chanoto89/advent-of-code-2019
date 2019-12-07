import input from './input.json';

const calculateFuleRequired = (mass: number): number => {
  return Math.floor(mass / 3) - 2;
};

(() => {
  const totalFuelNeeded = input.reduce((prev: number, next: number) => {
    return prev + calculateFuleRequired(next);
  }, 0);

  console.log('Total Fuel Needed: ', totalFuelNeeded);
})();
