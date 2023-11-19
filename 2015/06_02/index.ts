enum CommandAction {
  TurnOn,
  TurnOff,
  Toggle
}

interface CommandCoordinate {
  x: number,
  y: number,
}

interface Command {
  action: CommandAction
  fromCoordinates: CommandCoordinate,
  toCoordinates: CommandCoordinate,
}

const parseCommand = (line: string) : Command => {
  const TURN_ON = 'turn on'
  const TURN_OFF = 'turn off'
  const TOGGLE = 'toggle'

  // 1. get action
  const action = 
    line.includes(TURN_ON) ? CommandAction.TurnOn :
    line.includes(TURN_OFF) ? CommandAction.TurnOff :
    line.includes(TOGGLE) ? CommandAction.Toggle : null
    
  if (action == null) {
    throw `Error: parseCommand(): string does not contain correct action: ${line}`
  }

  // 2. get coordinates
  const splitedString = line
    .replace(TURN_ON, '')
    .replace(TURN_OFF, '')
    .replace(TOGGLE, '')
    .split(' ')
    .filter(str => str !== '')

  const fromCoordinatesArr = splitedString[0].split(',').map(Number)
  const toCoordinatesArr = splitedString[2].split(',').map(Number)

  // 3. return result
  return {
    action,
    fromCoordinates: {
      x: fromCoordinatesArr[0],
      y: fromCoordinatesArr[1],
    },
    toCoordinates: {
      x: toCoordinatesArr[0],
      y: toCoordinatesArr[1],
    }
  }
}

// read input
const input = Deno.readTextFileSync('./input')

// parse commands
const commands = input.split('\n').map(parseCommand)

// process commands
const lightMap: { [key: string] : number } = {}

commands.forEach((command) => {
  for (let x = command.fromCoordinates.x; x <= command.toCoordinates.x; x++) {
    for (let y = command.fromCoordinates.y; y <= command.toCoordinates.y; y++) {
      const lightKey = `${x},${y}`

      if (lightMap[lightKey] == undefined) {
        lightMap[lightKey] = 0
      }

      switch (command.action) {
        case CommandAction.TurnOn:
          lightMap[lightKey] += 1
          break;
        case CommandAction.TurnOff:
          lightMap[lightKey] -= 1
          break;
        case CommandAction.Toggle:
          lightMap[lightKey] += 2
          break;
      }

      if (lightMap[lightKey] < 0) {
        lightMap[lightKey] = 0
      }
    }  
  }
})

// get total brightness
const totalBrightness = Object.values(lightMap)
  .reduce((acc, cur) => acc + cur, 0);

// print result
console.log(totalBrightness)