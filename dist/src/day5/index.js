"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_json_1 = __importDefault(require("./input.json"));
const { inputString } = input_json_1.default;
// Sample inputs
// const inputString = '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9';
// const inputString = '3,3,1105,-1,9,1101,0,0,12,4,12,99,1';
// const inputString =
//   '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99';
// Answer for part 2
// 12648139
const inputArray = inputString.split(',').map(x => Number(x));
const calculateOpCodeRules = (opCode) => {
    const opCodeRules = {
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
const calculateOpcodeOutputs = (systemId) => {
    const inputCopy = [...inputArray];
    const outputs = [];
    const totalOpCodes = [];
    let timesRun = 0;
    for (let i = 0; i < inputArray.length; timesRun++) {
        const opCodeRules = calculateOpCodeRules(inputCopy[i]);
        const { opCode, parameterModes } = opCodeRules;
        const col1 = inputCopy[i + 1];
        const col2 = inputCopy[i + 2];
        const inputValue1 = parameterModes[0] === 1 ? col1 : inputCopy[col1];
        const inputValue2 = parameterModes[1] === 1 ? col2 : inputCopy[col2];
        const col3 = inputCopy[i + 3];
        switch (opCode) {
            case 1:
            case 2:
                // Calculate inputValues based on parameter modes
                // 0 = position mode, 1 = immediate mode
                const {} = opCodeRules;
                if (opCode === 1) {
                    inputCopy[col3] = inputValue1 + inputValue2;
                }
                else if (opCode === 2) {
                    inputCopy[col3] = inputValue1 * inputValue2;
                }
                i += 4;
                break;
            case 3:
                inputCopy[col1] = systemId;
                i += 2;
                break;
            case 4:
                outputs.push(parameterModes[0] === 1 ? col1 : inputCopy[col1]);
                i += 2;
                break;
            case 5:
                if (inputValue1 !== 0) {
                    i = inputValue2;
                }
                else {
                    i += 3;
                }
                break;
            case 6:
                if (inputValue1 === 0) {
                    i = inputValue2;
                }
                else {
                    i += 3;
                }
                break;
            case 7:
                if (inputValue1 < inputValue2) {
                    inputCopy[col3] = 1;
                }
                else {
                    inputCopy[col3] = 0;
                }
                i += 4;
                break;
            case 8:
                if (inputValue1 === inputValue2) {
                    inputCopy[col3] = 1;
                }
                else {
                    inputCopy[col3] = 0;
                }
                i += 4;
                break;
            case 99:
                if (totalOpCodes[totalOpCodes.length - 1] !== 4) {
                    throw new Error('99 OpCode reached without a prior 4 OpCode');
                }
                return outputs;
            default:
                console.log('Invalid Code: ', opCode);
                throw new Error('Invalid OpCode');
        }
        totalOpCodes.push(opCode);
    }
    return outputs;
};
// NOTE: provide the sytemId the value of 1, the ID for the ship's air conditioner unit
console.time('Run');
const systemId = 5;
const opCodeOutputs = calculateOpcodeOutputs(systemId);
if (!opCodeOutputs.length) {
    throw new Error('No outputs returned');
}
if (opCodeOutputs.length > 1) {
    const uniqueOutputs = [...new Set(opCodeOutputs)];
    if (uniqueOutputs.length > 2 || uniqueOutputs[0] !== 0) {
        throw new Error('Outputs not calculated correctly');
    }
}
const diagnosticCode = opCodeOutputs.pop();
console.log('The diagnostic code is: ', diagnosticCode);
console.timeEnd('Run');
/**
 * Part 1
 */
// Sample inputs
// const inputString = '1003,0,4,0,99';
// const inputString = '1002,4,3,4,33';
// Answer for part 1
// 4511442
// const inputArray = inputString.split(',').map(x => Number(x));
// type OpCodeRules = {
//   opCode: number;
//   parameterModes: number[];
// };
// const calculateOpCodeRules = (opCode: number): OpCodeRules => {
//   const opCodeRules: OpCodeRules = {
//     opCode,
//     // tslint:disable-next-line:trailing-comma
//     parameterModes: []
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
// const calculateOpcodeOutputs = (systemId: number): number[] => {
//   const inputCopy = [...inputArray];
//   const outputs: number[] = [];
//   const totalOpCodes: number[] = [];
//   let timesRun = 0;
//   for (let i = 0; i < inputArray.length; timesRun++) {
//     const opCodeRules = calculateOpCodeRules(inputCopy[i]);
//     const { opCode, parameterModes } = opCodeRules;
//     const col1 = inputCopy[i + 1];
//     switch (opCode) {
//       case 1:
//       case 2:
//         const col2 = inputCopy[i + 2];
//         const col3 = inputCopy[i + 3];
//         // Calculate inputValues based on parameter modes
//         // 0 = position mode, 1 = immediate mode
//         const {} = opCodeRules;
//         const inputValue1 = parameterModes[0] === 1 ? col1 : inputCopy[col1];
//         const inputValue2 = parameterModes[1] === 1 ? col2 : inputCopy[col2];
//         if (opCode === 1) {
//           inputCopy[col3] = inputValue1 + inputValue2;
//         } else if (opCode === 2) {
//           inputCopy[col3] = inputValue1 * inputValue2;
//         }
//         i += 4;
//         break;
//       case 3:
//         inputCopy[col1] = systemId;
//         i += 2;
//         break;
//       case 4:
//         outputs.push(parameterModes[0] === 1 ? col1 : inputCopy[col1]);
//         i += 2;
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
// const systemId = 1;
// const opCodeOutputs = calculateOpcodeOutputs(systemId);
// if (!opCodeOutputs.length) {
//   throw new Error('No outputs returned');
// }
// if (opCodeOutputs.length > 1) {
//   const uniqueOutputs = [...new Set(opCodeOutputs)];
//   if (uniqueOutputs.length > 2 || uniqueOutputs[0] !== 0) {
//     throw new Error('Outputs not calculated correctly');
//   }
// }
// const diagnosticCode = opCodeOutputs.pop();
// console.log('The diagnostic code is: ', diagnosticCode);
// console.timeEnd('Run');
//# sourceMappingURL=index.js.map