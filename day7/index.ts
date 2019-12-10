import { ArrayUtils } from '../utils';
import input from './input.json';

// Sample inputs
// import { sample1, sample2, sample3, sample4 } from './sample.json';
// const input = sample4;

type OpCodeRules = {
  opCode: number;
  parameterModes: number[];
};

type ThrusterResults = {
  phaseSequence: number[];
  signal: number;
};

type AmplifierState = {
  map: number[];
  pointer: number;
  machineNumber: number;
  inputs: number[];
  outputs: number[];
  halt: boolean;
};

const calculateOpCodeRules = (opCode: number): OpCodeRules => {
  const opCodeRules: OpCodeRules = {
    opCode,
    parameterModes: [],
  };

  const opCodeString = opCode.toString();
  const opCodeLength = opCodeString.length;

  if (opCodeLength > 1) {
    const opCodeIndex = opCodeLength - 2;

    opCodeRules.opCode = Number(opCodeString.substr(opCodeIndex, opCodeLength));

    for (let i = 0; i < opCodeIndex; i++) {
      opCodeRules.parameterModes.unshift(Number(opCodeString[i]));
    }
  }

  return opCodeRules;
};

const calculateAmplifiersOutput = (amplifierState: AmplifierState): void => {
  let { map, machineNumber, inputs, outputs } = amplifierState;

  for (amplifierState.pointer; amplifierState.pointer < map.length; ) {
    const opCodeRules = calculateOpCodeRules(map[amplifierState.pointer]);
    const { opCode, parameterModes } = opCodeRules;

    const col1 = map[amplifierState.pointer + 1];
    const col2 = map[amplifierState.pointer + 2];
    const inputValue1 = parameterModes[0] === 1 ? col1 : map[col1];
    const inputValue2 = parameterModes[1] === 1 ? col2 : map[col2];
    const col3 = map[amplifierState.pointer + 3];

    switch (opCode) {
      case 1:
      case 2:
        // Calculate inputValues based on parameter modes
        // 0 = position mode, 1 = immediate mode
        const {} = opCodeRules;

        if (opCode === 1) {
          map[col3] = inputValue1 + inputValue2;
        } else if (opCode === 2) {
          map[col3] = inputValue1 * inputValue2;
        }

        amplifierState.pointer += 4;
        break;
      case 3:
        // console.log(
        //   'MACHINE NO: ',
        //   machineNumber + 1,
        //   'Pointer',
        //   amplifierState.pointer,
        //   'INPUTS: ',
        //   inputs
        // );
        let input = inputs.splice(0, 1);
        if (!input.length) {
          return;
        }
        map[col1] = input[0];
        amplifierState.pointer += 2;
        break;
      case 4:
        outputs.push(parameterModes[0] === 1 ? col1 : map[col1]);
        // console.log(
        //   'MACHINE NO: ',
        //   machineNumber + 1,
        //   'Pointer',
        //   amplifierState.pointer,
        //   'OUTPUTS: ',
        //   outputs
        // );
        amplifierState.pointer += 2;

        break;
      case 5:
        if (inputValue1 !== 0) {
          amplifierState.pointer = inputValue2;
        } else {
          amplifierState.pointer += 3;
        }
        break;
      case 6:
        if (inputValue1 === 0) {
          amplifierState.pointer = inputValue2;
        } else {
          amplifierState.pointer += 3;
        }
        break;
      case 7:
        if (inputValue1 < inputValue2) {
          map[col3] = 1;
        } else {
          map[col3] = 0;
        }
        amplifierState.pointer += 4;
        break;
      case 8:
        if (inputValue1 === inputValue2) {
          map[col3] = 1;
        } else {
          map[col3] = 0;
        }
        amplifierState.pointer += 4;
        break;
      case 99:
        amplifierState.halt = true;
        return;
      default:
        return;
    }
  }
};

const calculateThrustersForRange = (permutations: number[][]): ThrusterResults => {
  return permutations.reduce(
    (prev: ThrusterResults, phaseSequence, idx: number) => {
      const firstMachine = 0;
      const lastMachine = phaseSequence.length - 1;
      const phaseSequenceCopy = [...phaseSequence];
      const amplifierStates = phaseSequence.map((seq, idx) => {
        return {
          map: [...input],
          pointer: 0,
          machineNumber: idx,
          inputs: idx === 0 ? [phaseSequence[0], 0] : [],
          outputs: [],
          halt: false,
        } as AmplifierState;
      });

      let nextIndex = 0;
      while (!amplifierStates[lastMachine].halt) {
        const currentMachine = amplifierStates[nextIndex];
        calculateAmplifiersOutput(currentMachine);

        if (currentMachine.machineNumber === lastMachine) {
          if (currentMachine.halt) {
            break;
          }
          nextIndex = firstMachine;
        } else {
          nextIndex++;
        }

        const nextMachine: AmplifierState = amplifierStates[nextIndex];

        nextMachine.inputs = [...currentMachine.outputs];
        phaseSequence.splice(0, 1);
        if (phaseSequence.length) {
          nextMachine.inputs.unshift(phaseSequence[0]);
        }

        currentMachine.outputs = [];
      }

      const lastOutput = amplifierStates[lastMachine].outputs[0];

      if (lastOutput > prev.signal) {
        prev.signal = lastOutput;
        prev.phaseSequence = phaseSequenceCopy;
      }

      return prev;
    },
    { phaseSequence: [], signal: 0 } as ThrusterResults
  );
};

(() => {
  // NOTE: provide the sytemId the value of 1, the ID for the ship's air conditioner unit
  console.time('Run');
  const validValues = [5, 6, 7, 8, 9];

  const permutations = ArrayUtils.permutateWithoutRepetitions(validValues);
  // const permutations = [validValues];

  const maxThrusters = calculateThrustersForRange(permutations);
  console.log('Max Thruster Information: ', maxThrusters);

  console.timeEnd('Run');
})();

/**
 *
 *
 * Part 1 - answer 298586
 *
 */
// type OpCodeRules = {
//   opCode: number;
//   parameterModes: number[];
// };

// type ThrusterResults = {
//   phaseSequence: number[];
//   signal: number;
// };

// const calculateOpCodeRules = (opCode: number): OpCodeRules => {
//   const opCodeRules: OpCodeRules = {
//     opCode,
//     parameterModes: [],
//   };

//   const opCodeString = opCode.toString();
//   const opCodeLength = opCodeString.length;

//   if (opCodeLength > 1) {
//     const opCodeIndex = opCodeLength - 2;

//     opCodeRules.opCode = Number(opCodeString.substr(opCodeIndex, opCodeLength));

//     for (let i = 0; i < opCodeIndex; i++) {
//       opCodeRules.parameterModes.unshift(Number(opCodeString[i]));
//     }
//   }

//   return opCodeRules;
// };

// const calculateOpcodeOutputs = (inputs: number[]): number[] => {
//   const inputCopy = input;
//   const outputs: number[] = [];
//   const totalOpCodes: number[] = [];
//   let timesRun = 0;

//   for (let i = 0; i < input.length; timesRun++) {
//     const opCodeRules = calculateOpCodeRules(inputCopy[i]);
//     const { opCode, parameterModes } = opCodeRules;

//     const col1 = inputCopy[i + 1];
//     const col2 = inputCopy[i + 2];
//     const inputValue1 = parameterModes[0] === 1 ? col1 : inputCopy[col1];
//     const inputValue2 = parameterModes[1] === 1 ? col2 : inputCopy[col2];
//     const col3 = inputCopy[i + 3];

//     switch (opCode) {
//       case 1:
//       case 2:
//         // Calculate inputValues based on parameter modes
//         // 0 = position mode, 1 = immediate mode
//         const {} = opCodeRules;

//         if (opCode === 1) {
//           inputCopy[col3] = inputValue1 + inputValue2;
//         } else if (opCode === 2) {
//           inputCopy[col3] = inputValue1 * inputValue2;
//         }

//         i += 4;
//         break;
//       case 3:
//         const input = inputs.splice(0, 1);
//         if (!input.length) {
//           throw new Error('Run out of inputs');
//         }
//         inputCopy[col1] = input[0];
//         i += 2;
//         break;
//       case 4:
//         outputs.push(parameterModes[0] === 1 ? col1 : inputCopy[col1]);
//         i += 2;
//         break;
//       case 5:
//         if (inputValue1 !== 0) {
//           i = inputValue2;
//         } else {
//           i += 3;
//         }
//         break;
//       case 6:
//         if (inputValue1 === 0) {
//           i = inputValue2;
//         } else {
//           i += 3;
//         }
//         break;
//       case 7:
//         if (inputValue1 < inputValue2) {
//           inputCopy[col3] = 1;
//         } else {
//           inputCopy[col3] = 0;
//         }
//         i += 4;
//         break;
//       case 8:
//         if (inputValue1 === inputValue2) {
//           inputCopy[col3] = 1;
//         } else {
//           inputCopy[col3] = 0;
//         }
//         i += 4;
//         break;
//       case 99:
//         if (totalOpCodes[totalOpCodes.length - 1] !== 4) {
//           throw new Error('99 OpCode reached without a prior 4 OpCode');
//         }

//         return outputs;
//       default:
//         console.log('Invalid Code: ', opCode);
//         throw new Error('Invalid OpCode');
//     }

//     totalOpCodes.push(opCode);
//   }

//   return outputs;
// };

// // NOTE: provide the sytemId the value of 1, the ID for the ship's air conditioner unit
// console.time('Run');
// const validValues = [0, 1, 2, 3, 4];

// const permutations = ArrayUtils.permutateWithoutRepetitions(validValues);

// const maxThrusters = permutations.reduce(
//   (prev: ThrusterResults, phaseSequence) => {
//     const thrusterResult = phaseSequence.reduce((prev, curr) => {
//       const input = [curr, prev];

//       const opCodeOutputs = calculateOpcodeOutputs(input);
//       if (!opCodeOutputs.length) {
//         throw new Error('No outputs returned');
//       }

//       prev = Number(opCodeOutputs.pop());

//       return prev;
//     }, 0);

//     if (thrusterResult > prev.signal) {
//       prev = { phaseSequence, signal: thrusterResult };
//     }

//     return prev;
//   },
//   { phaseSequence: [], signal: 0 } as ThrusterResults
// );

// console.log('Max Thruster Information: ', maxThrusters);

// console.timeEnd('Run');
