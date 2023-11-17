const containsThreeVowels = (str: string): boolean => {
  const vowels = ['a', 'e', 'i', 'o', 'u']
  let count = 0

  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      count++
    }
  }

  return count >= 3
}

const containsDoubleLetter = (str: string): boolean => { 
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      return true
    }
  }

  return false
}

const containsForbiddenStrings = (str: string): boolean => {
  const forbiddenStrings = ['ab', 'cd', 'pq', 'xy']

  for (let i = 0; i < forbiddenStrings.length; i++) {
    if (str.includes(forbiddenStrings[i])) {
      return true
    }
  }

  return false
}

const isNice = (str: string): boolean => {
  return containsThreeVowels(str) && containsDoubleLetter(str) && !containsForbiddenStrings(str)
}

const input = await Deno.readTextFile('./input')

const words = input.split('\n')

let niceCount = 0

for (let i = 0; i < words.length; i++) {
  if (isNice(words[i])) {
    niceCount++
  }
}

console.log(niceCount)