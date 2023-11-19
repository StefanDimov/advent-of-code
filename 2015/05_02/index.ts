const containsRepeatedTwoLetters = (word: string) : boolean => {
  for (let i = 0; i < word.length - 1; i++) {
    const firstLetter = word[i]
    const secondLetter = word[i + 1]

    const twoLetters = `${firstLetter}${secondLetter}`

    for (let y = i + 2; y < word.length - 1; y++) {
      
      if (y + 1 >= word.length) {
        break;
      }

      const matchFirstLetter = word[y];
      const matchSecondLetter = word[y + 1];

      const matchTwoLetters = `${matchFirstLetter}${matchSecondLetter}`
      
      if (twoLetters == matchTwoLetters) {
        return true
      }
    }
  }

  return false;
}

const constainsRepeatedOscillatingLetter = (word: string) : boolean => {

  for (let i = 0; i < word.length - 2; i++) {
    const firstLetter = word[i]
    const thirdLetter = word[i + 2]

    if (firstLetter === thirdLetter) {
      return true;
    }
  }

  return false;
}

const isNiceWord = (word: string) : boolean => containsRepeatedTwoLetters(word) && constainsRepeatedOscillatingLetter(word);

const input = Deno.readTextFileSync('./input')

const result = input
  .split('\n')
  .filter(isNiceWord)
  .length;

console.log(result)