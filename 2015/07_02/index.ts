const AND_OPERATOR = 'AND'
const OR_OPERATOR = 'OR'
const NOT_OPERATOR = 'NOT'
const LEFT_SHIFT_OPERATOR = 'LSHIFT'
const RIGHT_SHIFT_OPERATOR = 'RSHIFT'
const ASSIGN_OPERATOR = 'ASSIGN_SIGNAL'


const isSignal = (str: string) : boolean => !isNaN(Number(str))
const isWireName = (str: string) : boolean => !isSignal(str)

/// Returns the operand value
/// Case 1: Signal - returns the value
/// Case 2: Wire - tries to get the value from the wireValues map
/// If the wire is not present in the wireValues map it returns null
const getOperand = (str: string, wireValues: { [key: string] : number }) : number | null => {
  if (isSignal(str)) {
    return Number(str);
  }

  if (isWireName(str) && wireValues[str] !== undefined) {
    return wireValues[str]
  }

  return null
}

const getGate = (instruction: string) : string => {
  return instruction.includes(AND_OPERATOR) ? AND_OPERATOR :
    instruction.includes(OR_OPERATOR) ? OR_OPERATOR :
    instruction.includes(NOT_OPERATOR) ? NOT_OPERATOR :
    instruction.includes(LEFT_SHIFT_OPERATOR) ? LEFT_SHIFT_OPERATOR :
    instruction.includes(RIGHT_SHIFT_OPERATOR) ? RIGHT_SHIFT_OPERATOR : ASSIGN_OPERATOR
}

/// Returns the singal value for an instruction
/// If some of the operands don't have signals, it will return null
const getSignalFromInstruction = (instruction: string, wireSignals: { [key: string] : number }) : number | null => {
  const [operation, ] = instruction.split(' -> ');

  // get gate
  const gate = getGate(instruction)

  if (gate == ASSIGN_OPERATOR) {
    // 44430 -> a
    const operand = getOperand(operation, wireSignals)

    if (operand === null) {
      return null
    }

    return operand
  }

  if (gate == NOT_OPERATOR) {
    // NOT a -> b
    const [, operand] = operation.split(' ')

    const operandValue = getOperand(operand, wireSignals)

    if (operandValue !== null) {
      return 0x0000FFFF ^ operandValue
    } else {
      // console.warn(`WARN: Some of the operands are not provided: ${operandValue}`)
      return null
    }
  }
    
  // a AND b -> c
  const [first, , second] = operation.split(' ')
  
  const firstOperand = getOperand(first, wireSignals)
  const secondOperand = getOperand(second, wireSignals)

  if (firstOperand === null || secondOperand === null) {
    // console.warn(`WARN: Some of the operands are not provided: first: ${firstOperand}, second ${secondOperand}, instruction ${instruction}`)
    return null
  }

  switch (gate) {
    case AND_OPERATOR: {  
      return firstOperand & secondOperand
    }
    case OR_OPERATOR: {
      return firstOperand | secondOperand
    }
    case LEFT_SHIFT_OPERATOR: {
      return firstOperand << secondOperand
    }
    case RIGHT_SHIFT_OPERATOR: {
      return firstOperand >> secondOperand
    }
    default:
      return null
  }
}

const runInstructions = (instructions: string[], signals?: { [key: string] : number }): { wireSignals: { [key: string] : number }, unfulfilledInstructions: string[] } => {
  const wireSignals : { [key: string] : number } = signals ?? {}
  const unfulfilledInstructions: string[] = [];

  instructions.forEach((instruction) => {
    const instructionSignal = getSignalFromInstruction(instruction, wireSignals)

    if (instructionSignal !== null) {
      // assign result to wire
      const [, destination] = instruction.split(' -> ');
      wireSignals[destination] = instructionSignal
    } else {
      unfulfilledInstructions.push(instruction)
    }
  });

  return { wireSignals, unfulfilledInstructions }
}

const input = Deno.readTextFileSync('./input')

let instructions = input.split('\n')
let firstResult

do {
  firstResult = runInstructions(instructions, firstResult?.wireSignals)
  instructions = firstResult.unfulfilledInstructions
} while (firstResult.unfulfilledInstructions.length > 0)

const aSignal = firstResult.wireSignals['a']

// filter out b assing instruction
instructions = input.split('\n')
  .filter((instruction) => !instruction.endsWith(' -> b'))
let secondResult

do {
  // provide b value initially
  secondResult = runInstructions(instructions, secondResult?.wireSignals ?? { b: aSignal })
  instructions = secondResult.unfulfilledInstructions
} while (secondResult.unfulfilledInstructions.length > 0)

console.log(secondResult.wireSignals['a'])