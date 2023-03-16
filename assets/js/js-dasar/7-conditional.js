// IF
let response = prompt("1 + 1 = ")
if (response == 2) {
    alert("Correct!")
} else if (response < 2) {
    alert("Too low!")
} else {
    alert("Too high!")
}

// SWITCH
let color = "red"

switch (color) {
    case "red":
        alert("I love red!")
        break
    case "blue":
        alert("I love blue!")
        break
    default:
        alert("I don't know what color it is!")
        break
}