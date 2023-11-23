const allLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const incrementPassword = (password: string) : string => {

  const passwordLetters = password.split('').reverse()

  let hasPreviousLetterOverflown = false;
  let needToIncrementFirstLetter = true;

  const resultLetters: string[] = []

  for (const letter of passwordLetters) {
    if (needToIncrementFirstLetter || hasPreviousLetterOverflown) {
      const letterIndex = allLetters.indexOf(letter)
      const newIndex = (letterIndex + 1) % allLetters.length

      resultLetters.push(allLetters[newIndex])

      hasPreviousLetterOverflown = newIndex === 0;
      needToIncrementFirstLetter = false;
    } else {
      resultLetters.push(letter)
    }
  }

  return resultLetters.reverse().join('')
}

const containsThreeIncreasingStraightLetters = (str: string) : boolean => {
  for (let i = 0; i < str.length - 2; i++) {
    const first = str[i]
    const second = str[i + 1]
    const third = str[i + 2]
    
    const firstIndex = allLetters.indexOf(first)
    const secondIndex = allLetters.indexOf(second)
    const thirdIndex = allLetters.indexOf(third)

    if (firstIndex + 1 === secondIndex && secondIndex + 1 === thirdIndex) {
      return true;
    }
  }

  return false;
}

const includesForbidenLetters = (str: string) : boolean =>
  ['i', 'o', 'l'].some(forbidenLetter => str.includes(forbidenLetter))

const containsTwoDifferentNonOverlappingPairsOfLetters = (str: string) : boolean => {

  let firstPairLetter
  let firstPairStartIndex

  for (let i = 0; i < str.length - 1; i++) {
    const first = str[i];
    const second = str[i + 1]

    if (first !== second) {
      continue
    }

    if (!firstPairLetter) {
      firstPairLetter = first;
      firstPairStartIndex = i
      continue;
    }

    // second pair should be a different letter
    if (first === firstPairLetter) {
      continue;
    }

    // second pair should not overlap with first letter
    if (i + 1 == firstPairStartIndex) {
      continue;
    }

    return true;
  }

  return false;
}

let password = 'vzbxxyzz'

for (let i = 0; i < Math.pow(allLetters.length, password.length); i++) {
  password = incrementPassword(password)

  if (containsThreeIncreasingStraightLetters(password) && !includesForbidenLetters(password) && containsTwoDifferentNonOverlappingPairsOfLetters(password)) {
    console.log(i)
    break;
  }
}

console.log(password) 