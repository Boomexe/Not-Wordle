const INPUT_CONTAINER = document.getElementById("input-container");
const INPUT_BOX = document.getElementById("input-text");

const POSSIBLE_WORDS = ["hello", "marry", "crane", "crypt", "jazzy", "chaff", "chair", "zebra", "there", "where", "stare", "bears", "pears", "mares", "lofty", "fails", "games", "yacht", "queen"];

const ANSWER = POSSIBLE_WORDS[Math.floor(Math.random() * POSSIBLE_WORDS.length)].toLowerCase();
const ANSWER_LETTER_OCCURRENCES = countLetterOccurrences(ANSWER);

const GREEN = "#019a01";
const YELLOW = "#ffc425";

let currentGuess = 1;
const MAX_GUESSES = 6;

let inputLetterOccurrences = {};

INPUT_BOX.onkeydown = function(e) {
    if (e.key == "Enter") {
        enterGuess();
    }
}

function enterGuess() {
    if (INPUT_BOX.value.length !== 5) {
        INPUT_BOX.style.animation = "input-shake 0.25s linear"

        setTimeout(() => {
            INPUT_BOX.style.animation = "";
        }, 500)
        return;
    }

    let text = INPUT_BOX.value.toLowerCase();
    inputLetterOccurrences = {};

    /*
    We loop through to check for green letters first to remove funky edge cases with duplicate letters.
    After all the green letters are identified, then we move on to yellow.
    */

    for (var i = 0; i < text.length; i++) {
        let char = text.charAt(i);
        
        let charBox = document.getElementById(`r${currentGuess}`).getElementsByTagName("td")[i];
        
        span = charBox.getElementsByTagName("span")[0];
        span.innerHTML = char.toUpperCase();
        span.style.animation = "fade-in 1s linear";
        checkLetter(i, char, charBox, "green");

    }

    for (var i = 0; i < text.length; i++) {
        let char = text.charAt(i);
        
        let charBox = document.getElementById(`r${currentGuess}`).getElementsByTagName("td")[i];

        span = charBox.getElementsByTagName("span")[0];
        span.innerHTML = char.toUpperCase();
        charBox.style.animation = "fade-in 1s linear";
        checkLetter(i, char, charBox, "yellow");
    }

    checkWin(text);
    lastGuess();
    INPUT_BOX.value = "";
}

function checkWin(text) {
    if (text == ANSWER) {
        win();
    }

    else {
        currentGuess++;
    }
}

function checkLetter(index, letter, charBox, letterType) {
    if (letterType == "green") {
        for (i = 0; i < 5; i++) {
            if (ANSWER.charAt(i) == letter && i == index) {
                if (inputLetterOccurrences[letter] < ANSWER_LETTER_OCCURRENCES[letter] || inputLetterOccurrences[letter] === undefined)
                {
                    charBox.style.backgroundColor = GREEN;
                    inputLetterOccurrences = addLetterOccurrences(inputLetterOccurrences, letter);
                }     
            }
        }
    } else {
        if (inputLetterOccurrences[letter] < ANSWER_LETTER_OCCURRENCES[letter] || inputLetterOccurrences[letter] === undefined) {
            if (ANSWER.includes(letter) && charBox.style.backgroundColor !== GREEN) {
                charBox.style.backgroundColor = YELLOW;
                inputLetterOccurrences = addLetterOccurrences(inputLetterOccurrences, letter);
            }
        }
    }
}

function lastGuess() {
    if (currentGuess > MAX_GUESSES) {
        alert(`You lost. The correct word was ${ANSWER}.`);
    }
}

function win() {
    setTimeout(function() { alert(`You won in ${currentGuess} guesses!`); }, 10);
}

function countLetterOccurrences(inputString) {
    let letterOccurrences = {};

    for (const letter of inputString) {
        if (letterOccurrences[letter]) {
            letterOccurrences[letter]++;
        } else {
            letterOccurrences[letter] = 1;
        }
    }

    return letterOccurrences;
}

function addLetterOccurrences(inputObj, letter) {
    if (inputObj[letter]) {
        inputObj[letter]++;
    } else {
        inputObj[letter] = 1;
    }

    return inputObj;
}