import input from './input.json';
// const input = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L'];

const orbitKeys = input.reduce((prev, curr: string) => {
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
