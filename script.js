const inputs = document.querySelector(".inputs");
const resetbtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const wrongletter = document.querySelector(".wrong-letter span");
const typinginput = document.querySelector(".typing-input");
const guessleft = document.querySelector(".guess-left span");

let name, maxGuesses, corrects = [], incorrects = [];

function randomname() {
    let ranobj = nameList[Math.floor(Math.random() * nameList.length)];
    name = ranobj.name.toLowerCase();
    maxGuesses = 8; 
    corrects = []; 
    incorrects = [];

    hint.innerText = ranobj.hint;
    guessleft.innerText = maxGuesses;
    wrongletter.innerText = incorrects;

    let html = "";
    for (let i = 0; i < name.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomname();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if (key.match(/^[a-z]$/) &&
        !incorrects.includes(key) &&
        !corrects.includes(key)) 
    {
        if (name.includes(key)) {
            for (let i = 0; i < name.length; i++) {
                if (name[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key.toUpperCase();
                }
            }
        } else {
            maxGuesses--;
            incorrects.push(key);
        }
    }
    guessleft.innerText = maxGuesses;
    wrongletter.innerText = incorrects;
    typinginput.value = "";

    setTimeout(() => {
        if (corrects.length === name.length) {
            alert(`Congratulations! You found the name. ${name.toUpperCase()}`);
            randomname();
        } else if (maxGuesses < 1) {
            alert("Game Over! You don't have any guesses left");
            for (let i = 0; i < name.length; i++) {
                inputs.querySelectorAll("input")[i].value = name[i].toUpperCase();
            }
        }
    }, 100);
}

resetbtn.addEventListener("click", randomname);
typinginput.addEventListener("input", initGame);
document.addEventListener("click", () => typinginput.focus());
document.addEventListener("keydown", (e) => {
    if (e.key.match(/^[a-zA-Z]$/)) {
        typinginput.focus();
    }
});






