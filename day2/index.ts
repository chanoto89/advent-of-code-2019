import input from './input.json';

(() => {
  const haltIndex = input.lastIndexOf(99);
  const opCodeResult = [...input];

  if (haltIndex < 0) {
    throw new Error('Halt Number 99 not found in input data');
  }

  /**
   * Special Rules: replace position 1 with the value 12 and replace position 2 with the value 2
   */

  opCodeResult[1] = 12;
  opCodeResult[2] = 2;

  let index = 0;
  while (index < haltIndex) {
    const col0 = opCodeResult[index];
    const col1 = opCodeResult[index + 1];
    const col2 = opCodeResult[index + 2];
    const col3 = opCodeResult[index + 3];

    if (col0 === 1) {
      opCodeResult[col3] = opCodeResult[col1] + opCodeResult[col2];
    } else if (col0 === 2) {
      opCodeResult[col3] = opCodeResult[col1] * opCodeResult[col2];
    } else {
      throw new Error('Invalid OpCode');
    }

    index += 4;
  }

  console.log(
    'Final OpCode Result First 4 numbers: ',
    opCodeResult.slice(0, 4)
  );
})();
