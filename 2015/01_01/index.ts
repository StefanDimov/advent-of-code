// read input file
const input = await Deno.readTextFile("./input")

const inputChars = input.split("");

const openParentesisCount = inputChars.filter((char) => char === "(").length;
const closeParentesisCount = inputChars.filter((char) => char === ")").length;

const floor = openParentesisCount - closeParentesisCount;

console.log(`Floor: ${floor}`);
