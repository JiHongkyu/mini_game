const hidden = 'hidden';
const header = document.querySelector('.header');
const headerButton = document.querySelector('.header button');
const main = document.querySelector('.main');
const h1 = main.querySelector('h1');
const mainForm = main.querySelector('form');
const mainInput = mainForm.querySelector('input');
const mainButton = main.querySelector('button');
const bar = document.querySelector('.bar');
const time = bar.querySelector('p:first-child span');
const correct = bar.querySelector('p:last-child span');
const img = main.querySelector('img');
const gameEnd = document.querySelector('.gameEnd');
const gameEndCorrect = gameEnd.querySelector('p span');
const gameEndButton = gameEnd.querySelector('button');
const champion = [];
const championName = [];
let num = 0;
let countDown = 30;

fetch("http://ddragon.leagueoflegends.com/cdn/9.19.1/data/ko_KR/champion.json").then(response => response.json()).then(data => {
    for(let key in data.data) {
        champion.push(key);
    }
});

fetch("http://ddragon.leagueoflegends.com/cdn/9.19.1/data/ko_KR/champion.json").then(response => response.json()).then(data => {
    for(let value of Object.values(data.data)) {
        championName.push(value.name);
    }
});


function countDownTime() {
    if(countDown > 0) {
        time.innerText = --countDown;
    } else {
        main.classList.add(hidden);
        gameEnd.classList.remove(hidden);
        gameEndCorrect.innerText = num;
        gameEndButton.addEventListener('click', endGame);
    }
}

function randomWord() {
    const random = parseInt(Math.random() * champion.length);
    fetch(`http://ddragon.leagueoflegends.com/cdn/9.19.1/img/champion/${champion[random]}.png`).then(response => img.src = response.url);
    h1.innerText = championName[random];
}

function gameStart() {
    header.classList.add(hidden);
    gameEnd.classList.add(hidden);
    main.classList.remove(hidden);
    mainInput.focus();
    randomWord();
    time.innerText = countDown;
    mainButton.addEventListener('click', endGame);
    setInterval(countDownTime, 1000);
}

function endGame() {
    location.reload();
}

function submitInput(event) {
    event.preventDefault();
    const text = mainInput.value;
    mainInput.value = '';
    if(text.toLowerCase().replace(/\s/g, "") === h1.innerText.toLowerCase().replace(/\s/g, "")) {
        correct.innerText = ++num;
        randomWord();
    } else {
        console.log('틀림');
    }
}
headerButton.addEventListener('click', gameStart);
mainForm.addEventListener('submit', submitInput);

