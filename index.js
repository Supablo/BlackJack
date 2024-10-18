let firstCard;
let secondCard;
let sum;
let cards = [];
let hasBlackJack;
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("card-el");
let blackJackCounter = localStorage.getItem("blackJackCounter") ? parseInt(localStorage.getItem("blackJackCounter")) : 0;
let bJ = document.createElement("h3");
let pSum = document.createElement("h3");

bJ.innerText = "BlackJack Counter: " + blackJackCounter;
pSum.innerText = "Previous Hand's Sum: " + (localStorage.getItem("previousSum") || 0);
document.body.appendChild(bJ);
document.body.appendChild(pSum);

function renderGame() 
{
    cards[0] = firstCard;
    cards[1] = secondCard;
    sum = getSum();
    sumEl.innerText = "Sum: " + sum;
    cardsEl.innerText = "Cards: ";

    for (let i = 0; i < cards.length; i++) cardsEl.innerText += " " + cards[i];

    if (sum < 21) messageEl.innerText = "Do you want to draw a new card? 🙂";
    else if (hasBlackJack) messageEl.innerText = "Wohoo! You've got Blackjack! 🥳";
    else messageEl.innerText = "You're out of the game! 😭";

    localStorage.setItem("cards", JSON.stringify(cards));
    localStorage.setItem("sum", sum);
    localStorage.setItem("hasBlackJack", hasBlackJack);
}

function newCard() 
{
    let card = getRandomCard();
    cards.push(card);
    renderGame();
}

function startGame() 
{
    while (cards.length > 0) cards.pop();

    pSum.innerText = "Previous Hand's Sum: " + sum;
    localStorage.setItem("previousSum", sum);

    hasBlackJack = false;
    firstCard = getRandomCard();
    secondCard = getRandomCard();
    sum = getSum();

    renderGame();
}

function getSum() 
{
    let x = 0;

    for (let i = 0; i < cards.length; i++) x += cards[i];
    if (x == 21) 
    {
        hasBlackJack = true;
        blackJackCounter++;
        bJ.innerText = "BlackJack Counter: " + blackJackCounter;
        localStorage.setItem("blackJackCounter", blackJackCounter);
    }

    return x;
}

function getRandomCard() 
{
    let randomNum = Math.floor(Math.random() * 13 + 1);

    if (randomNum > 9) return 10;
    else if (randomNum == 1) return 11;
    else return randomNum;
}

window.onload = function() 
{
    if (localStorage.getItem("cards")) 
    {
        cards = JSON.parse(localStorage.getItem("cards"));
        sum = parseInt(localStorage.getItem("sum"));
        hasBlackJack = localStorage.getItem("hasBlackJack") === "true";
        renderGame();
    }
}