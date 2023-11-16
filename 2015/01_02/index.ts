const input = Deno.readTextFileSync('./input');

let floor = 0;

for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === "(") {
        floor++;
    } else if (char === ")") {
        floor--;
    }

    if (floor === -1) {
        console.log(`Position: ${i + 1}`);
        break;
    }
}