const intialValue = '1113122113'
const interations = 40

let currentValue = intialValue

for (let i = 0; i < interations; i++) {

  const prevValue = currentValue
  currentValue = ''

  if (prevValue.length === 1) {
    currentValue = `1${prevValue}`
    continue;
  }

  let processingChar
  let charCount = 0

  for (let y = 0; y < prevValue.length; y++) {
    const currentChar = prevValue[y];

    const isCharTheSame = processingChar === currentChar
    const isProcessingChar = processingChar !== undefined
    const isLastChar = y === prevValue.length - 1

    if (isLastChar) {
      if (isCharTheSame) {
        // increment count
        charCount += 1

        // assing char
        currentValue += `${charCount}${processingChar}`
      } else {
        // assing prev char
        currentValue += `${charCount}${processingChar}`

        // assign last different char
        currentValue += `1${currentChar}`
      }

      break;
    }

    if (!isCharTheSame) {

      if (isProcessingChar) {
        // append char
        currentValue += `${charCount}${processingChar}`
      }

      // set new char state
      processingChar = currentChar
      charCount = 1

    } else {

      // increment char count
      charCount += 1
    }
  }
}

console.log(currentValue.length)