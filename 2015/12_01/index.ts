const input = Deno.readTextFileSync('./input')

const chars = input.split('')

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
