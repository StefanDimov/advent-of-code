const encodeQuotes = (str: string) : string => str.replace(/"/g, '\\"')

const encodeBackslash = (str: string) : string => str.replace(/\\/g, '\\\\')

const addSurroundingQuotes = (str: string) : string => `"${str}"`

const getStringLength = (str: string) : number => str.length

const sum = (a: number, b: number) : number => a + b

// read input
const input = Deno.readTextFileSync('./input')

// split lines
const lines = input.split('\n')

// calc total input length
const inputLength = lines
  .map(getStringLength)
  .reduce(sum)

// calc escaped input length
const escapedLength = lines
  .map(encodeBackslash)
  .map(encodeQuotes)
  .map(addSurroundingQuotes)
  .map(getStringLength)
  .reduce(sum)

// calc result
const result = escapedLength - inputLength

// print
console.log(result)