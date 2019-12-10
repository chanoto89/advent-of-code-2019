import input from './input.json';
// const input = [
//   'COM)B',
//   'B)C',
//   'C)D',
//   'D)E',
//   'E)F',
//   'B)G',
//   'G)H',
//   'D)I',
//   'E)J',
//   'J)K',
//   'K)L',
//   'K)YOU',
//   'I)SAN',
// ];

const SANTA = 'SAN';
const YOU = 'YOU';

const mapTotalOrbit = (start: string): {} => {
  let parentOrbits = {};
  let parentOrbit = orbitKeys[start];
  let trips = 0;

  while (parentOrbit) {
    parentOrbits[parentOrbit] = trips++;
    parentOrbit = orbitKeys[parentOrbit];
  }

  return parentOrbits;
};

const orbitKeys = input.reduce((prev, curr: string) => {
  const [orbitObj, obj] = curr.split(')');

  prev[obj] = orbitObj;

  return prev;
}, {});

const santasOrbits = mapTotalOrbit(SANTA);
const myTotalOrbits = mapTotalOrbit(YOU);

let totalOrbits: number[] = [];

for (let myOrbit in myTotalOrbits) {
  const matchingSantaOrbit = santasOrbits[myOrbit];
  if (matchingSantaOrbit) {
    totalOrbits.push(matchingSantaOrbit + myTotalOrbits[myOrbit]);
  }
}

console.log('Lowest Total Orbits: ', Math.min(...totalOrbits));

/**
 *
 * Part 1
 *
 */
// const input = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L'];
// const orbitKeys = input.reduce((prev, curr: string) => {
//   const [orbitObj, obj] = curr.split(')');

//   prev[obj] = orbitObj;

//   return prev;
// }, {});

// let totalOrbits = 0;
// for (let key in orbitKeys) {
//   let parentOrbit = orbitKeys[key];

//   while (parentOrbit) {
//     totalOrbits++;
//     parentOrbit = orbitKeys[parentOrbit];
//   }
// }

// console.log('Total Orbits: ', totalOrbits);
