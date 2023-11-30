const INPUT_BOX = document.getElementById("input-text");

const possibleWords = ["hello", "marry", "crane", "crypt", "jazzy", "chaff", "chair", "zebra", "there", "where", "stare", "bears", "pears", "mares", "lofty", "fails", "games", "yacht", "queen"];

// const answer = possibleWords[Math.floor(Math.random() * possibleWords.length)].toLowerCase();
const answer = "cheer";

const GREEN = "#019a01";
const YELLOW = "#ffc425";

let currentGuess = 1;
let answerLetterOccurences = countLetterOccurrences(answer);

let inputLetterOccurrences = {};

INPUT_BOX.onkeydown = function(e) {
    if (e.key == "Enter") {
        enterGuess();
    }
}

function enterGuess() {
    if (INPUT_BOX.value.length !== 5) {
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
        charBox.style.animation = "fade-in 1s linear";
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
    if (text == answer) {
        win();
    }

    else {
        currentGuess++;
    }
}

function checkLetter(index, letter, charBox, letterType) {
    if (letterType == "green") {
        for (i = 0; i < 5; i++) {
            if (answer.charAt(i) == letter && i == index) {
                if (inputLetterOccurrences[letter] < answerLetterOccurences[letter] || inputLetterOccurrences[letter] === undefined)
                {
                    charBox.style.backgroundColor = GREEN;
                    inputLetterOccurrences = addLetterOccurrences(inputLetterOccurrences, letter);
                }     
            }
        }
    } else {
        if (inputLetterOccurrences[letter] < answerLetterOccurences[letter] || inputLetterOccurrences[letter] === undefined) {
            if (answer.includes(letter) && charBox.style.backgroundColor !== GREEN) {
                charBox.style.backgroundColor = YELLOW;
                inputLetterOccurrences = addLetterOccurrences(inputLetterOccurrences, letter);
            }
        }
    }
}

function checkLetterForYellow(index, letter, charBox) {
    
}

function lastGuess() {
    if (currentGuess > 5) {
        alert(`You lost. The correct word was ${answer}.`);
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