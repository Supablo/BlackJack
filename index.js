let firstCard;
let secondCard;
let fCardD;
let sCardD;
let sum;
let sumD;
let bet;
let cards = [];
let cardsD = [];
let hasBlackJack;
let hasStanded;
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let dSum = document.getElementById("dealer-sum");
let cardsEl = document.getElementById("card-el");
let dCards = document.getElementById("dealer-card");
let cash = document.getElementById("money")
let money = 100
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
    cardsD[0] = fCardD;
    cardsD[1] = sCardD;
    sum = getSum();
    sumD = getSumD()
    sumEl.innerText = "Sum: " + sum;
    dSum.innerText = "Dealer Sum: " + sumD;
    cardsEl.innerText = "Cards: ";
    dCards.innerText = "Dealer Cards: ";
    cash.innerText = "Cash: $" + money

    for (let i = 0; i < cards.length; i++) cardsEl.innerText += " " + cards[i];
    for (let j = 0; j < cardsD.length; j++) dCards.innerText += " " + cardsD[j];

    if (!hasStanded)
    {
        if (sum < 21) messageEl.innerText = "Do you want to draw a new card? 🙂";
        else if (hasBlackJack) messageEl.innerText = "Wohoo! You've got Blackjack! 🥳";
        else messageEl.innerText = "You're out of the game! 😭";
    }

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
function newCardD()
{
    let dCard = getRandomCard();
    cardsD.push(dCard)
    renderGame()
}

function stand()
{
    hasStanded = true
    while (sumD < 17) newCardD()
    
    if (sumD > 21)
    {
        messageEl.innerText = "The dealer has busted! You win double your money!"
        money += (2 * bet);
        renderGame()
    }
    else if (sumD > sum) messageEl.innerText = "You lost to the Dealer!"
    else if (sum == sumD)
    {
        messageEl.innerText = "You tied with the dealer! You get your money back."
        money += parseInt(bet);
        renderGame()
    }
    else
    {
        messageEl.innerText = "You won against the Dealer! You get double your money!"
        money += (2 * bet);
        renderGame()
    }
}

function startGame() 
{
    while (cards.length > 0) cards.pop();
    while (cardsD.length > 0) cardsD.pop(); 

    pSum.innerText = "Previous Hand's Sum: " + sum;
    localStorage.setItem("previousSum", sum);

    takeBet()
    hasBlackJack = false;
    firstCard = getRandomCard()
    secondCard = getRandomCard()
    fCardD = getRandomCard()
    sCardD = getRandomCard()
    sum = getSum();
    sumD = getSumD()

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
function getSumD()
{
    let y = 0;
    for (let j = 0; j < cardsD.length; j++) y += cardsD[j]
    return y 
}

function getRandomCard() 
{
    let randomNum = Math.floor(Math.random() * 13 + 1);

    if (randomNum > 9) return 10;
    else if (randomNum == 1) return 11;
    else return randomNum;
}

function takeBet()
{
    bet = prompt("How much do you want to bet?")
    if (parseInt(bet) > money || parseInt(bet) < 0) while (parseInt(bet) > money || parseInt(bet) < 0) bet = prompt("Re-enter how much you wanna bet within the limits of your coffers!")
    money -= parseInt(bet)
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