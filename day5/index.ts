import input from './input.json';
const { inputString } = input;

// Sample inputs
// const inputString = '1003,0,4,0,99';
// const inputString = '1002,4,3,4,33';
// Answer for part 1
// 4511442

const inputArray = inputString.split(',').map(x => Number(x));

type OpCodeRules = {
  opCode: number;
  parameterModes: number[];
};

const calculateOpCodeRules = (opCode: number): OpCodeRules => {
  const opCodeRules: OpCodeRules = {
    opCode,
    // tslint:disable-next-line:trailing-comma
    parameterModes: []
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

const calculateOpcodeOutputs = (systemId: number): number[] => {
  const inputCopy = [...inputArray];
  const outputs: number[] = [];
  const totalOpCodes: number[] = [];
  let timesRun = 0;

  for (let i = 0; i < inputArray.length; timesRun++) {
    const opCodeRules = calculateOpCodeRules(inputCopy[i]);
    const { opCode, parameterModes } = opCodeRules;
    const col1 = inputCopy[i + 1];

    switch (opCode) {
      case 1:
      case 2:
        const col2 = inputCopy[i + 2];
        const col3 = inputCopy[i + 3];

        // Calculate inputValues based on parameter modes
        // 0 = position mode, 1 = immediate mode
        const {} = opCodeRules;
        const inputValue1 = parameterModes[0] === 1 ? col1 : inputCopy[col1];
        const inputValue2 = parameterModes[1] === 1 ? col2 : inputCopy[col2];

        if (opCode === 1) {
          inputCopy[col3] = inputValue1 + inputValue2;
        } else if (opCode === 2) {
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
const systemId = 1;
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
