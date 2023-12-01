const INPUT_CONTAINER = document.getElementById("input-container");
const INPUT_BOX = document.getElementById("input-text");

const POSSIBLE_WORDS = ["hello", "marry", "crane", "crypt", "jazzy", "chaff", "chair", "zebra", "there", "where", "stare", "bears", "pears", "mares", "lofty", "fails", "games", "yacht", "queen"];

let answer = getRandomWord("api");
let answerLetterOccurrences = "";

/* 
FOR DEBUGGING
*/

// let answer = "cheer";
// let answerLetterOccurrences = countLetterOccurrences(answer);
// INPUT_BOX.removeAttribute("readonly");

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
        INPUT_BOX.style.animation = "input-shake 0.25s ease-out"

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
        charBox.style.borderColor = "rgba(0, 0, 0, 0)";
        charBox.style.backgroundColor = "#3C445C";
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
                if (inputLetterOccurrences[letter] < answerLetterOccurrences[letter] || inputLetterOccurrences[letter] === undefined)
                {
                    charBox.style.backgroundColor = GREEN;
                    inputLetterOccurrences = addLetterOccurrences(inputLetterOccurrences, letter);
                }     
            }
        }
    } else {
        if (inputLetterOccurrences[letter] < answerLetterOccurrences[letter] || inputLetterOccurrences[letter] === undefined) {
            if (answer.includes(letter)) { //&& charBox.style.backgroundColor !== GREEN) {
                charBox.style.backgroundColor = YELLOW;
                inputLetterOccurrences = addLetterOccurrences(inputLetterOccurrences, letter);
            }
        }
    }
}

function lastGuess() {
    if (currentGuess > MAX_GUESSES) {
        setTimeout(() => {
            alert(`You lost. The correct word was ${answer}.`); 
        }, 25);
    }
}

function win() {
    setTimeout(() => {
        alert(`You won in ${currentGuess} guesses!`); 
    }, 25);
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

function getRandomWord(type) {
    if (type == "local") {
        INPUT_BOX.removeAttribute("readonly");
        answer = getLocalWord();
    }

    fetch("https://random-word-api.herokuapp.com/word?length=5&lang=en")
    .then(response => {
        if (!response.ok) {
            console.error(`HTTP Error: Status: ${response.status}. Getting local word instead`);
            answer = getLocalWord();
            INPUT_BOX.removeAttribute("readonly");
        }

        return response.json();
    })
    .then(data => {
        const requestText = data[0];
        answer = requestText;
        answerLetterOccurrences = countLetterOccurrences(answer);
        INPUT_BOX.removeAttribute("readonly");

        return requestText;
    })
    .catch(error => {
        console.error('Error:', error);
        answer = getLocalWord();
        INPUT_BOX.removeAttribute("readonly");
    });
}

function getLocalWord() {
    const ANSWER = POSSIBLE_WORDS[Math.floor(Math.random() * POSSIBLE_WORDS.length)].toLowerCase();

    return ANSWER;
}