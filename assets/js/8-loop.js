// FOR
for (let i = 0; i < 5; i++) {
    console.log(`Iterasi ke ${i}`)
}

console.log("")

// DO .. WHILE
let i = 0;

do {
    console.log(`Iterasi ke ${i}`);
    i++;
} while (i < 5);

console.log("")

// WHILE
let j = 0;
while (j < 5) {
    console.log(`Iterasi ke ${j}`);
    j++;
}

console.log("")

// LOOP CONTROL: BREAK
for (let i = 0; i < 5; i++) {
    if (i == 3) {
        break
    }
    console.log(`Iterasi ke ${i}`)
}

console.log("")

// LOOP CONTROL: CONTINUE
for (let i = 0; i < 5; i++) {
    if (i == 3) {
        continue
    }
    console.log(`Iterasi ke ${i}`)
}