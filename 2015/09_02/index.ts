// read input
const input = Deno.readTextFileSync('./input')
const lines = input.split('\n')

type DistanceInfo = { destinations: string[], distance: number }

// parse input
const allDestinations: Set<string> = new Set()
const distances: DistanceInfo[] = []

lines.forEach(line => {
  const [locationsStr, distanceStr] = line.split('=')

  const [firstDestination, secondDestionation] = locationsStr
    .split('to')
    .map(x => x.trim())

  allDestinations.add(firstDestination)
  allDestinations.add(secondDestionation)

  distances.push({
    destinations: [firstDestination, secondDestionation],
    distance: Number(distanceStr)
  })
});

// find shorted path that does not repeat destinations

const iterateGraph = (currentDestination: string, prevVisitedDestinations: Set<string>, totalTraveledDistance: number) : number[] => {
  // 1. re-assign visited destinations and add current destination
  const visitedDestinations: Set<string> = new Set(prevVisitedDestinations)
  visitedDestinations.add(currentDestination)

  // 2. find connecting destinations
  const connectingDistances = distances.filter(distance => distance.destinations.includes(currentDestination))

  // 3. get only not visited distances
  const notVisitedDistances = connectingDistances.filter((distance) => 
    !visitedDestinations.has(distance.destinations[0]) || !visitedDestinations.has(distance.destinations[1]))
  
  // finished all destinations
  if (notVisitedDistances.length === 0 && visitedDestinations.size === allDestinations.size) {
    return [totalTraveledDistance]
  }

  // dead end
  if (notVisitedDistances.length === 0 && visitedDestinations.size !== allDestinations.size) {
    return [];
  }

  return notVisitedDistances.map(distanceInfo => {
    const nextDestination = distanceInfo.destinations
      .filter(destination => destination != currentDestination)[0];

    return iterateGraph(nextDestination, visitedDestinations, totalTraveledDistance + distanceInfo.distance)
  }).flat();
};

const results = []

for (const destination of allDestinations.values()) {
  const traveledDistances = iterateGraph(destination, new Set(), 0)

  results.push(...traveledDistances)
}

const sortedResults = results.sort((a, b) => b - a)

console.log(sortedResults[0])
