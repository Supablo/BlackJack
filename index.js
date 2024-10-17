let firstCard
let secondCard 
let sum
let cards = []
let hasBlackJack
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("card-el")
let blackJackCounter = 0
let bJ = document.createElement("h3")

bJ.innerText = "BlackJack Counter: " + blackJackCounter
document.body.appendChild(bJ)

function renderGame()
{
    cards[0] = firstCard; cards[1] = secondCard
    sum = getSum()
    sumEl.innerText = "Sum: " + sum
    cardsEl.innerText = "Cards: "

    for (let i = 0; i < cards.length; i++) cardsEl.innerText += " " + cards[i]

    if (sum < 21) messageEl.innerText = "Do you want to draw a new card? 🙂"
    else if (hasBlackJack) messageEl.innerText = "Wohoo! You've got Blackjack! 🥳"
    else messageEl.innerText = "You're out of the game! 😭"
}

function newCard()
{
    let card = getRandomCard()

    sum = getSum()
    cards.push(card)

    renderGame()
}

function startGame()
{
    while (cards[0] != null) cards.pop()

    hasBlackJack = false
    firstCard = getRandomCard()
    secondCard = getRandomCard()
    sum = getSum()

    renderGame()
}

function getSum()
{
    x = 0

    for (let i = 0; i < cards.length; i++) x += cards[i]
    if (x == 21) 
    {
        hasBlackJack = true
        blackJackCounter++
        bJ.innerText = "BlackJack Counter: " + blackJackCounter
    }

    return x
}

function getRandomCard()
{
    randomNum = Math.floor(Math.random() * 13  + 1)
    if (randomNum > 9) return 10
    else if (randomNum == 1) return 11
    else return randomNum
}