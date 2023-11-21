const removeStringQuotes = (str: string) : string => str.slice(1, -1)

const replacedEscapedQuote = (str: string) : string => str.replace(/\\"/g, ".")

const replacedEscapedBackslash = (str: string) : string => str.replace(/\\\\/g, ".")

const replaceHexadecimalNotation = (str: string) : string => str.replace(/\\x[0-9A-Fa-f]{2}/g, '.')

const getStringLength = (str: string) : number => str.length

const sum = (a: number, b: number) : number => a + b

// read input
const input = Deno.readTextFileSync('./input')
const lines = input.split('\n')

// get code chars
const codeChars = lines
  .map(getStringLength)
  .reduce(sum, 0)

// get memory chars
const memoryChars = lines
  .map(removeStringQuotes)
  .map(replacedEscapedBackslash)
  .map(replacedEscapedQuote)
  .map(replaceHexadecimalNotation)
  .map(getStringLength)
  .reduce(sum, 0)

// calc result
const result = codeChars - memoryChars

// print
console.log(result)