import input from './input.json';

const haltIndex = input.lastIndexOf(99);

const calculateOpcode = (noun: number, verb: number): Array<number> => {
  const opCodeCopy = [...input];

  /**
   * Special Rules: replace position 1 with the noun and replace position 2 with the verb
   */
  opCodeCopy[1] = noun;
  opCodeCopy[2] = verb;

  let index = 0;
  while (index < haltIndex) {
    const col0 = opCodeCopy[index];
    const col1 = opCodeCopy[index + 1];
    const col2 = opCodeCopy[index + 2];
    const col3 = opCodeCopy[index + 3];

    if (col0 === 1) {
      opCodeCopy[col3] = opCodeCopy[col1] + opCodeCopy[col2];
    } else if (col0 === 2) {
      opCodeCopy[col3] = opCodeCopy[col1] * opCodeCopy[col2];
    } else {
      throw new Error('Invalid OpCode');
    }

    index += 4;
  }

  return opCodeCopy;
};

(() => {
  const finalResult = 19690720;

  if (haltIndex < 0) {
    throw new Error('Halt Number 99 not found in input data');
  }

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const opCodeResult = calculateOpcode(noun, verb);
      const output = opCodeResult[0];

      if (output === finalResult) {
        // Final Answer Calculation - 100 * noun + verb
        const finalAnswer = 100 * noun + verb;
        console.log(`Final Verb = ${verb}, Noun = ${noun}, Ouput = ${output}`);
        console.log(`Final Answer: ${finalAnswer}`);
        return;
      }
    }
  }

  console.log('No matches found');
})();

// Part 1

// (() => {
//   const haltIndex = input.lastIndexOf(99);
//   const opCodeResult = [...input];

//   if (haltIndex < 0) {
//     throw new Error('Halt Number 99 not found in input data');
//   }

//   /**
//    * Special Rules: replace position 1 with the value 12 and replace position 2 with the value 2
//    */

//   opCodeResult[1] = 12;
//   opCodeResult[2] = 2;

//   let index = 0;
//   while (index < haltIndex) {
//     const col0 = opCodeResult[index];
//     const col1 = opCodeResult[index + 1];
//     const col2 = opCodeResult[index + 2];
//     const col3 = opCodeResult[index + 3];

//     if (col0 === 1) {
//       opCodeResult[col3] = opCodeResult[col1] + opCodeResult[col2];
//     } else if (col0 === 2) {
//       opCodeResult[col3] = opCodeResult[col1] * opCodeResult[col2];
//     } else {
//       throw new Error('Invalid OpCode');
//     }

//     index += 4;
//   }

//   console.log(
//     'Final OpCode Result First 4 numbers: ',
//     opCodeResult.slice(0, 4)
//   );
// })();
