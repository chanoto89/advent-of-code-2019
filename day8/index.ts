import { image, image2 } from './input.json';

// Answer HGBCF (check output.json)

(() => {
  const layerWidth = 25;
  const layerHeight = 6;

  const imageRows = image.match(new RegExp(`.{1,${layerWidth}}`, 'g'));
  if (!imageRows) {
    throw new Error('Unable to build image layers');
  }

  const outputArray: string[] = imageRows.slice(0, layerHeight);

  for (let i = layerHeight; i < imageRows.length; i += layerHeight) {
    const layer = imageRows.slice(i, i + layerHeight);

    for (let row = 0; row < layer.length; row++) {
      const imageRow = layer[row];
      for (let col = 0; col < imageRow.length; col++) {
        const imageValue = imageRow[col];
        const currentOutput = outputArray[row][col];
        if (['0', '1'].includes(currentOutput)) {
          continue;
        }

        const newOutput =
          outputArray[row].substr(0, col) +
          imageValue +
          outputArray[row].substr(col + imageValue.length);
        outputArray[row] = newOutput;
      }
    }
  }

  console.log('The image result is', outputArray);
})();

/**
 *
 *
 * Part 1
 *
 */

// type LayerValues = {
//   zeroCount: number;
//   multiplication: number;
// };

// (() => {
//   const layerWidth = 25;
//   const layerHeight = 6;

//   const imageRows = image.match(new RegExp(`.{1,${layerWidth}}`, 'g'));

//   if (!imageRows) {
//     throw new Error('Unable to build image layers');
//   }

//   const fewestZeroesLayer: LayerValues = { multiplication: 0, zeroCount: -1 };

//   for (let i = 0; i < imageRows.length; i += layerHeight) {
//     const layer = imageRows.slice(i, i + layerHeight).join('');
//     const zeroCount = (layer.match(/0/g) || []).length;

//     if (fewestZeroesLayer.zeroCount === -1 || fewestZeroesLayer.zeroCount > zeroCount) {
//       fewestZeroesLayer.zeroCount = zeroCount;
//       const amountOfOnes = (layer.match(/1/g) || []).length;
//       const amountOfTwos = (layer.match(/2/g) || []).length;
//       fewestZeroesLayer.multiplication = amountOfOnes * amountOfTwos;
//     }
//   }

//   console.log('The Layer Details with fewest 0s: ', fewestZeroesLayer);
// })();
