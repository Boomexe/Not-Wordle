const INPUT_BOX = document.getElementById("input-text");

const possibleWords = ["hello", "marry", "crane", "crypt", "jazzy", "chaff", "chair", "zebra", "there", "where", "stare", "bears", "pears", "mares", "lofty", "fails", "games", "yacht", "queen"];

const answer = possibleWords[Math.floor(Math.random() * possibleWords.length)];

let currentGuess = 1;

const RED = "#019a01";
const YELLOW = "#ffc425";


INPUT_BOX.onkeydown = function(e) {
    console.log("Key: " + e.key);
    if (e.key == "Enter" && INPUT_BOX.value.length == 5) {
        enterGuess();
    }
}

function enterGuess() {
    let text = INPUT_BOX.value.toLowerCase();

    for (var i = 0; i < text.length; i++) {
        
        let char = text.charAt(i);
        
        let charBox = document.getElementById(`r${currentGuess}`).getElementsByTagName("td")[i];

        span = charBox.getElementsByTagName("span")[0];
        span.innerHTML = char.toUpperCase();
        charBox.style.animation = "fade-in 1s linear";
        checkLetter(i, char, charBox);
        // wait(1);
    }

    checkWin(text);
    checkLastGuess();
    INPUT_BOX.value = "";
}

function checkWin(text) {
    if (text == answer) {
        win();
    }

    else {
        currentGuess++;
    }
}

function checkLetter(index, letter, charBox) {
    for (i = 0; i < answer.length; i++) {
        if (answer.charAt(i) == letter && i == index) {
            charBox.style.backgroundColor = RED;
            return;
        }
    }

    if (answer.includes(letter)) {
        charBox.style.backgroundColor = YELLOW;
    }
}

function checkLastGuess() {
    if (currentGuess > 5) {
        alert(`You lost. The correct word was ${answer}.`);
    }
}

function win() {
    setTimeout(function() { alert(`You won in ${currentGuess} guesses!`); }, 10);
}
