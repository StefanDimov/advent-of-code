const input = await Deno.readTextFile('./input');

const santaPositon = {
  x: 0,
  y: 0,
}

const robotPosition = {
  x: 0,
  y: 0,
}

const movePosition = (position, direction) => {
  switch (direction) {
    case '^':
      position.y++;
      break;
    case 'v':
      position.y--;
      break;
    case '>':
      position.x++;
      break;
    case '<':
      position.x--;
      break;
  }
};

const visitedPositions = new Set();
visitedPositions.add(`0,0`);

for (let i = 0; i < input.length; i++) {
  const direction = input[i];

  if (i % 2 === 0) {
    movePosition(santaPositon, direction);
    visitedPositions.add(`${santaPositon.x},${santaPositon.y}`);
  } else {
    movePosition(robotPosition, direction);
    visitedPositions.add(`${robotPosition.x},${robotPosition.y}`);
  }  
}

console.log(visitedPositions.size);