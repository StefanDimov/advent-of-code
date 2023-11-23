const input = Deno.readTextFileSync('./input')

// remove "red" objects
const redValue = ':"red"'

let noRedInput = input

while (noRedInput.indexOf(redValue) !== -1) {

  const redValueIndex = noRedInput.indexOf(redValue)

  // find object open bracket index
  let openBracketIndex
  let skipOpenBracketCount = 0

  for (let i = redValueIndex; i >= 0; i--) {
    const char = noRedInput[i]
    
    if (char === '}') {
      skipOpenBracketCount += 1
    }

    if (char === '{') {
      if (skipOpenBracketCount === 0) {
        openBracketIndex = i;
        break;
      } else {
        skipOpenBracketCount -= 1
      }
    }
  }

  // find object close bracket index
  let closeBracketIndex
  let skipCloseBracketCount = 0

  for (let i = redValueIndex; i < noRedInput.length; i++) {
    const char = noRedInput[i]
    
    if (char === '{') {
      skipCloseBracketCount += 1
    }

    if (char === '}') {
      if (skipCloseBracketCount === 0) {
        closeBracketIndex = i;
        break;
      } else {
        skipCloseBracketCount -= 1
      }
    }
  }

  // remove red object from string
  const part1 = noRedInput.slice(0, openBracketIndex);
  const part2 = noRedInput.slice(closeBracketIndex! + 1);
  noRedInput = part1 + part2;
}

// remove unneeded chars
const chars = noRedInput.split('')

for (let i = 0; i < chars.length; i++) {
  const char = chars[i]

  const isMinus = char === '-'
  const isNumber = char.match(/[0-9]/)
  
  if (!isMinus && !isNumber) {
    chars[i] = ' '
  }
}

const numbersString = chars.join('')

const sum = numbersString
  .split(' ')
  .filter((str) => str !== null && str !== undefined)
  .map(Number)
  .reduce((a, b) => a + b)

console.log(sum)
