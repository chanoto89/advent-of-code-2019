import input from './input.json';
// import input from './sample.json';

const wireA = input[0].split(',');
const wireB = input[1].split(',');

const addCrossingPoint = (
  crossingPoints: object,
  xValue: number,
  yValue: number
) => {
  if (!crossingPoints[xValue]) {
    crossingPoints[xValue] = [yValue];
    return;
  }

  crossingPoints[xValue].push(yValue);
};

const mapWirePath = (routes: string[]): object => {
  const allCrossingPoints = {};
  let currentPosition = [0, 0];

  for (let route of routes) {
    const direction = route[0];
    const amount = Number(route.slice(1));
    let currentX = currentPosition[0];
    let currentY = currentPosition[1];

    for (let i = 1; i <= amount; i++) {
      // NOTE: This can probable be optimized. Currently sitting at under 90ms total runtime though
      switch (direction) {
        case 'R':
          currentX = currentPosition[0] + i;
          addCrossingPoint(allCrossingPoints, currentX, currentY);
          break;
        case 'L':
          currentX = currentPosition[0] - i;
          addCrossingPoint(allCrossingPoints, currentX, currentY);
          break;
        case 'D':
          currentY = currentPosition[1] + i;
          addCrossingPoint(allCrossingPoints, currentX, currentY);
          break;
        case 'U':
          currentY = currentPosition[1] - i;
          addCrossingPoint(allCrossingPoints, currentX, currentY);
          break;
        default:
          throw new Error('Invalid Direction');
      }
    }

    currentPosition = [currentX, currentY];
  }

  return allCrossingPoints;
};

// Note: My old way of doing this before refactoring. Leaving it here for now

// const mapWirePath = (routes: string[]): object => {
//   const allCrossingPoints = {};
//   let currentPosition = [0, 0];

//   for (let route of routes) {
//     const direction = route[0];
//     const amount = Number(route.slice(1));
//     switch (direction) {
//       case 'R':
//         for (let i = 1; i <= amount; i++) {
//           const xValue = currentPosition[0] + i;
//           if (!allCrossingPoints[xValue]) {
//             allCrossingPoints[xValue] = [currentPosition[1]];
//             continue;
//           }

//           allCrossingPoints[xValue].push(currentPosition[1]);
//         }
//         currentPosition[0] = currentPosition[0] += amount;
//         break;
//       case 'L':
//         for (let i = 1; i <= amount; i++) {
//           const xValue = currentPosition[0] - i;

//           if (!allCrossingPoints[xValue]) {
//             allCrossingPoints[xValue] = [currentPosition[1]];
//             continue;
//           }

//           allCrossingPoints[xValue].push(currentPosition[1]);
//         }
//         currentPosition[0] = currentPosition[0] -= amount;
//         break;
//       case 'U':
//         for (let i = 1; i <= amount; i++) {
//           const xValue = currentPosition[0];
//           const yValue = currentPosition[1] - i;

//           if (!allCrossingPoints[xValue]) {
//             allCrossingPoints[xValue] = [yValue];
//             continue;
//           }

//           allCrossingPoints[xValue].push(yValue);
//         }
//         currentPosition[1] = currentPosition[1] -= amount;
//         break;
//       case 'D':
//         for (let i = 1; i <= amount; i++) {
//           const xValue = currentPosition[0];
//           const yValue = currentPosition[1] + i;

//           if (!allCrossingPoints[xValue]) {
//             allCrossingPoints[xValue] = [yValue];
//             continue;
//           }

//           allCrossingPoints[xValue].push(yValue);
//         }
//         currentPosition[1] = currentPosition[1] += amount;
//         break;
//       default:
//         throw new Error('Invalid Direction');
//     }
//   }

//   return allCrossingPoints;
// };

console.time('RUN');
const wireAPaths = mapWirePath(wireA);
const wireBPaths = mapWirePath(wireB);

const intersectDistances: number[] = [];

for (let key in wireAPaths) {
  const matchingXs = wireBPaths[key];

  if (!matchingXs) {
    continue;
  }

  const matchingYs = wireAPaths[key].filter((x: number) =>
    matchingXs.includes(x)
  );

  for (let matchingY of matchingYs) {
    intersectDistances.push(Math.abs(Number(key)) + Math.abs(matchingY));
  }
}

const lowestDistances = Math.min(...intersectDistances);
console.log('The lowest intersecting distance is: ', lowestDistances);
console.timeEnd('RUN');
