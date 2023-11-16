const input = await Deno.readTextFile('./input');

let x = 0;
let y = 0;

const visitedPositions = new Set();

visitedPositions.add(`${x},${y}`);

for (let i = 0; i < input.length; i++) {
  const direction = input[i];
  
  switch (direction) {
    case '^':
      y++;
      break;
    case 'v':
      y--;
      break;
    case '>':
      x++;
      break;
    case '<':
      x--;
      break;
  }

  visitedPositions.add(`${x},${y}`);
}

console.log(visitedPositions.size);