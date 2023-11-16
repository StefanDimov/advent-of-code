const input = await Deno.readTextFile('./input');

const lines = input.split('\n');

const boxDimentions = lines.map((line) => line.split('x').map(Number));

const presentRibbonLengths = boxDimentions.map(([ w, h, l ]) => { 

  // sort assending
  const sortedDimentions = [w, h, l].sort((a, b) => a - b);

  const ribbonWrapLength = sortedDimentions[0] * 2 + sortedDimentions[1] * 2;

  const ribbonBowLength = w * h * l;

  return ribbonWrapLength + ribbonBowLength;
});

const totalRibbonLength = presentRibbonLengths.reduce((acc, curr) => acc + curr);

console.log(totalRibbonLength);