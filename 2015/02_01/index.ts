const text = await Deno.readTextFile('./input')

const lines = text.split('\n')

const dimentions = lines.map(line => line.split('x').map(Number))

const boxPaperLengths = dimentions.map(([l, w, h]) => {
  const top = l * w;
  const front = w * h;
  const side = h * l;

  const smallest = Math.min(top, front, side);

  return 2 * top + 2 * front + 2 * side + smallest;
});

const totalPaperLength = boxPaperLengths.reduce((acc, curr) => acc + curr, 0);

console.log(totalPaperLength)